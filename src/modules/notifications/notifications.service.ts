import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Like, Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
import axios from 'axios';
import { NotificationOperation } from './enums/notification-operation.enum';
import { NotificationType } from './enums/notification-type.enum';
import { UsersService } from '@users/users.service';
import { User } from '@users/entities/user.entity';
import { NotificationUpdateField } from './entities/notification-update-field.entity';
import { NotificationCloseField } from './entities/notification-close-field.entity';
import { CronJob } from 'cron';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private notificationsRepository: Repository<Notification>,
    @InjectRepository(NotificationUpdateField)
    private notificationUpdateFieldsRepository: Repository<NotificationUpdateField>,
    @InjectRepository(NotificationCloseField)
    private notificationCloseFieldsRepository: Repository<NotificationCloseField>,
    private usersService: UsersService, // private schedulerRegistry: SchedulerRegistry
  ) {}

  async create(
    createNotificationDto: CreateNotificationDto,
  ): Promise<Notification> {
    const recipients: User[] = [];
    await Promise.all(
      createNotificationDto.recipientsId.map(async (recipient) => {
        recipients.push(await this.usersService.findOne(recipient));
      }),
    );
    const notification = await this.notificationsRepository.save({
      recipients,
      ...createNotificationDto,
    });
    await Promise.all(
      createNotificationDto.updateFields.map(async (field) => {
        await this.notificationUpdateFieldsRepository.save({
          notification,
          ...field,
        });
      }),
    );
    await Promise.all(
      createNotificationDto.closeFields.map(async (field) => {
        await this.notificationCloseFieldsRepository.save({
          notification,
          ...field,
        });
      }),
    );
    return await this.findOne(notification.id);
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

  private async sendEmail(
    notification: Notification,
    emails: string[],
    record: object,
  ): Promise<void> {
    let subject: string | undefined;
    if (notification.subject) {
      subject = this.parseContent(notification.subject, record);
    }
    const body = this.parseContent(notification.subject, record);
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

  private async stopCronTime(
    entity: string,
    recordId: string,
    notificationId: string,
    job: CronJob,
  ): Promise<void> {
    const appDataSource = new DataSource({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: 'andon',
    });
    await appDataSource.initialize();
    const records = (await appDataSource.query(
      `SELECT * FROM ${entity} WHERE id='${recordId}'`,
    )) as object[];
    const notifications = (await appDataSource.query(
      `SELECT * FROM notification WHERE id='${notificationId}'`,
    )) as Notification[];
    if (records.length > 0 && notifications.length > 0) {
      const notification = notifications[0];
      const record = records[0];
      if (notification.cronTime) {
        const closeFields = (await appDataSource.query(
          `SELECT * FROM notification_close_field WHERE notificationId='${notification.id}'`,
        )) as NotificationCloseField[];
        let stop = true;
        closeFields.map((field) => {
          if (record[field.name] != field.value) stop = false;
        });
        if (!stop) return;
      }
    }
    job.stop();
  }

  async send(
    entity: string,
    operation: NotificationOperation,
    record: object,
    lastRecord?: object,
  ): Promise<void> {
    (
      await this.notificationsRepository.find({
        where: {
          entity,
          operations: Like(`%${operation}%`) as any,
          types: Like(`%${NotificationType.email}%`) as any,
        },
        relations: {
          recipients: true,
          updateFields: true,
          closeFields: true,
        },
      })
    ).map(async (notification) => {
      const recipients = notification.recipients.map(
        (recipient) => recipient.email,
      );
      // Missing role and group

      let send = false;
      if (operation == NotificationOperation.update) {
        if (lastRecord) {
          send = true;
          notification.updateFields.map((field) => {
            if (!record[field.name] || !lastRecord[field.name])
              throw new Error(
                `Send Notification: field '${field.name}' does not exit in the records`,
              );
            if (
              lastRecord[field.name] == record[field.name] ||
              (field.value && record[field.name] != field.value)
            )
              send = false;
          });
        }
      } else send = true;

      if (send) {
        // this.sendEmail(notification, recipients, record);
        if (notification.cronTime) {
          const job = new CronJob(notification.cronTime, () => {
            this.stopCronTime(entity, record['id'], notification.id, job);
          });
          job.start();
        }
      }
    });
    // const pushNotifications = await this.notificationsRepository.find({
    //   where: {
    //     entity,
    //     operations: Like(`%${operation}%`) as any,
    //     types: Like(`%${NotificationType.push}%`) as any,
    //   },
    // });
  }
}
