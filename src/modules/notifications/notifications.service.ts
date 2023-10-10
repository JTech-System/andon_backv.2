import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
import { NotificationOperation } from './enums/notification-operation.enum';
import { RecipientsInterface } from './interfaces/recipients.interface';
import { NotificationType } from './enums/notification-type.enum';

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
      fields.forEach(field => {
        const fieldName = field.slice(2, -2); // Remove << and >>
        if (record[fieldName] !== undefined) {
          parsedContent = parsedContent.replace(field, record[fieldName]);
        }
      });
    }

    return parsedContent;
  }

  async send(
    entity: string,
    operation: NotificationOperation,
    recipients: RecipientsInterface,
    records: object,
  ): Promise<void> {
    (await this.notificationsRepository.find({
      where: {
        entity,
        operations: Like(`%${operation}%`) as any,
        types: Like(`%${NotificationType.email}%`) as any,
      },
    })).map((notification) => {
      let subject: string | undefined;
      if(notification.subject) {
        subject = this.parseContent(notification.subject, records);
        console.log(subject);
      }
    })
    
    
    const pushNotifications = await this.notificationsRepository.find({
      where: {
        entity,
        operations: Like(`%${operation}%`) as any,
        types: Like(`%${NotificationType.push}%`) as any,
      },
    });
  }
}
