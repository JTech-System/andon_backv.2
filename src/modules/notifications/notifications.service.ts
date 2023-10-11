import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
import { NotificationOperation } from './enums/notification-operation.enum';
import { RecipientsInterface } from './interfaces/recipients.interface';
import { NotificationType } from './enums/notification-type.enum';
import * as nodemailer from 'nodemailer';
import * as smtpTransport from 'nodemailer-smtp-transport';
import axios from 'axios';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private notificationsRepository: Repository<Notification>,
  ) {}

  async create(
    createNotificationDto: CreateNotificationDto,
  ): Promise<Notification> {
    return await this.notificationsRepository.save(createNotificationDto);
  }

  async findAll(): Promise<Notification[]> {
    return await this.notificationsRepository.find();
  }

  async findOne(id: string): Promise<Notification> {
    const notification = await this.notificationsRepository.findOne({
      where: { id },
    });
    if (notification) return notification;
    throw new NotFoundException('Notification not found');
  }

  async update(
    id: string,
    updateNotificationDto: UpdateNotificationDto,
  ): Promise<Notification> {
    await this.findOne(id);
    await this.notificationsRepository.update({ id }, updateNotificationDto);
    return await this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.notificationsRepository.delete({ id });
  }

  private parseContent(content: string, record: object): string {
    let parsedContent = content;
    const fields = content.match(/<<([^>>]+)>>/g);

    if (fields) {
      fields.forEach((field) => {
        const fieldName = field.slice(2, -2);
        if (record[fieldName] !== undefined) {
          parsedContent = parsedContent.replace(field, record[fieldName]);
        }
      });
    }

    return parsedContent;
  }

  async send_email(
    notification: Notification,
    emails: string[],
    records: object,
  ): Promise<void> {
    let subject: string | undefined;
    if (notification.subject) {
      subject = this.parseContent(notification.subject, records);
    }
    const body = this.parseContent(notification.subject, records);
    const tokenEndpoint = `https://login.microsoftonline.com/${process.env.TENANT_ID}/oauth2/v2.0/token`;

    const requestBody = new URLSearchParams();
    requestBody.append('grant_type', 'client_credentials');
    requestBody.append('client_id', process.env.CLIENT_ID);
    requestBody.append('client_secret', process.env.CLIENT_SECRET);
    requestBody.append('scope', 'https://graph.microsoft.com/.default');

    try {
      let response = await axios.post(tokenEndpoint, requestBody, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      response = await axios.post(
        `https://graph.microsoft.com/v1.0/users/${process.env.EMAIL_HOST}/sendMail`,
        {
          message: {
            subject: subject,
            body: {
              contentType: 'HTML',
              content: body,
            },
            toRecipients: emails.map((email) => {
              return { emailAddress: { address: email } };
            }),
          },
        },
        {
          headers: {
            Authorization: `Bearer ${response.data.access_token}`,
            'Content-Type': 'application/json',
          },
        },
      );
    } catch (error) {
      throw new Error(`Failed to send the emails: ${error.message}`);
    }
  }

  async send(
    entity: string,
    operation: NotificationOperation,
    recipients: RecipientsInterface,
    records: object,
  ): Promise<void> {
    (
      await this.notificationsRepository.find({
        where: {
          entity,
          operations: Like(`%${operation}%`) as any,
          types: Like(`%${NotificationType.email}%`) as any,
        },
      })
    ).map(async (notification) => {
      this.send_email(notification, recipients.email, records);
    });

    const pushNotifications = await this.notificationsRepository.find({
      where: {
        entity,
        operations: Like(`%${operation}%`) as any,
        types: Like(`%${NotificationType.push}%`) as any,
      },
    });
  }
}
