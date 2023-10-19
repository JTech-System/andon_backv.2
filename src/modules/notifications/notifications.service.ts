import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Like, Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
import axios from 'axios';
import { NotificationOperation } from './enums/notification-operation.enum';
import { UsersService } from '@users/users.service';
import { User } from '@users/entities/user.entity';
import { NotificationUpdateField } from './entities/notification-update-field.entity';
import { CronJob } from 'cron';
import * as webPush from 'web-push';
import { CreateNotificationPushDto } from './dto/create-notification-push.dto';
import { NotificationPush } from './entities/notification-push.entity';
import { NotificationType } from './enums/notification-type.enum';
import { NotificationStopField } from './entities/notification-stop-field.entity';
import { Group } from '../groups/entities/group.entity';
import { GroupsService } from '../groups/group.service';

webPush.setVapidDetails(
  'mailto:leonel-leonel-1@hotmail.com',
  'BNjeAEyk0Op0Qhj4nSeyT2GOEdqum3Lm82ZNsFdMpMh8l9XDl4E0hvS9YirdQL3idD8VbZHBae5aXahc2jfPvlo',
  'A9i_UF455oXD-oBWtUyqT9dC-xyKc4iqTB7qmMeP944',
);

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private notificationsRepository: Repository<Notification>,
    @InjectRepository(NotificationUpdateField)
    private notificationUpdateFieldsRepository: Repository<NotificationUpdateField>,
    @InjectRepository(NotificationStopField)
    private notificationStopFieldsRepository: Repository<NotificationStopField>,
    @InjectRepository(NotificationPush)
    private notificationPushRepository: Repository<NotificationPush>,
    private usersService: UsersService,
    private groupsService: GroupsService,
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
    const groups: Group[] = [];
    await Promise.all(
      createNotificationDto.groupsId.map(async (group) => {
        groups.push(await this.groupsService.findOne(group));
      }),
    );
    const notification = await this.notificationsRepository.save({
      recipients,
      groups,
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
      createNotificationDto.stopFields.map(async (field) => {
        await this.notificationStopFieldsRepository.save({
          notification,
          ...field,
        });
      }),
    );
    return await this.findOne(notification.id);
  }

  async findAll(groupId?: string): Promise<Notification[]> {
    return await this.notificationsRepository.find({
      order: { name: 'ASC' },
      relations: { groups: true },
      where: {
        groups: {
          id: groupId,
        },
      },
    });
  }

  async findOne(id: string): Promise<Notification> {
    const notification = await this.notificationsRepository.findOne({
      where: { id },
      relations: {
        recipients: true,
        groups: true,
        updateFields: true,
        stopFields: true,
      },
    });
    if (notification) return notification;
    throw new NotFoundException('Notification not found');
  }

  async update(
    id: string,
    updateNotificationDto: UpdateNotificationDto,
  ): Promise<Notification> {
    await this.findOne(id);
    // await this.notificationsRepository.update({ id }, updateNotificationDto);
    await this.remove(id);
    const notification = await this.create(
      updateNotificationDto as unknown as any,
    );
    return await this.findOne(notification.id);
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
    const body = this.parseContent(notification.body, record);
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

  private async sendPush(
    notification: Notification,
    push: NotificationPush[],
    record: object,
  ): Promise<void> {
    let subject: string | undefined;
    if (notification.subject) {
      subject = this.parseContent(notification.subject, record);
    }
    const body = this.parseContent(notification.body, record);
    push.map(async (notificationPush) => {
      try {
        await webPush.sendNotification(
          {
            endpoint: notificationPush.endpoint,
            keys: {
              p256dh: notificationPush.p256dh,
              auth: notificationPush.auth,
            },
          },
          JSON.stringify({
            notification: {
              title: subject,
              body: body,
              icon: '/assets/images/icon.png',
            },
            data: {
              url: 'https://example.com/notification-details',
            },
          }),
        );
      } catch {
        this.removePush(notificationPush.id);
      }
    });
  }

  private checkIfSend(
    operation: NotificationOperation,
    notification: Notification,
    record: object,
    lastRecord?: object,
  ): boolean {
    let send = false;
    if (operation == NotificationOperation.UPDATE) {
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

    return send;
  }

  private async stopCronTime(
    entity: string,
    recordId: string,
    notificationId: string,
    job: CronJob,
  ): Promise<boolean> {
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
        const stopFields = (await appDataSource.query(
          `SELECT * FROM notification_stop_field WHERE notificationId='${notification.id}'`,
        )) as NotificationStopField[];
        let stop = true;
        stopFields.map((field) => {
          if (record[field.name] != field.value) stop = false;
        });
        if (!stop) return false;
      }
    }
    job.stop();
    return true;
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
          types: Like(`%${NotificationType.EMAIL}%`) as any,
        },
        relations: {
          recipients: true,
          groups: {
            users: true,
          },
          updateFields: true,
          stopFields: true,
        },
      })
    ).map(async (notification) => {
      const recipients = notification.recipients.map(
        (recipient) => recipient.email,
      );
      notification.groups.map((group) => {
        group.users.map((user) => {
          if (!recipients.find((recipient) => recipient == user.email))
            recipients.push(user.email);
        });
      });
      if (this.checkIfSend(operation, notification, record, lastRecord)) {
        if (notification.cronTime) {
          const job = new CronJob(notification.cronTime, async () => {
            if (
              !(await this.stopCronTime(
                entity,
                record['id'],
                notification.id,
                job,
              ))
            )
              await this.sendEmail(notification, recipients, record);
          });
          job.start();
        } else {
          await this.sendEmail(notification, recipients, record);
        }
      }
    });

    (
      await this.notificationsRepository.find({
        where: {
          entity,
          operations: Like(`%${operation}%`) as any,
          types: Like(`%${NotificationType.PUSH}%`) as any,
        },
        relations: {
          recipients: {
            notificationPush: true,
          },
          groups: {
            users: {
              notificationPush: true,
            },
          },
          updateFields: true,
          stopFields: true,
        },
      })
    ).map(async (notification) => {
      const push: NotificationPush[] = [];
      notification.recipients.map((recipient) => {
        recipient.notificationPush.map((notificationPush) =>
          push.push(notificationPush),
        );
      });
      notification.groups.map((group) => {
        group.users.map((user) => {
          user.notificationPush.map((notificationPush) => {
            if (
              !push.find(
                (findNotificationPush) =>
                  findNotificationPush.id == notificationPush.id,
              )
            )
              push.push(notificationPush);
          });
        });
      });
      if (this.checkIfSend(operation, notification, record, lastRecord)) {
        if (notification.cronTime) {
          const job = new CronJob(notification.cronTime, async () => {
            if (
              !(await this.stopCronTime(
                entity,
                record['id'],
                notification.id,
                job,
              ))
            )
              await this.sendPush(notification, push, record);
          });
          job.start();
        } else {
          await this.sendPush(notification, push, record);
        }
      }
    });
  }

  // Push

  async createPush(
    createNotificationPushDto: CreateNotificationPushDto,
    currentUser: User,
  ): Promise<void> {
    if (
      !(await this.notificationPushRepository.findOne({
        where: {
          auth: createNotificationPushDto.auth,
          p256dh: createNotificationPushDto.p256dh,
        },
      }))
    )
      await this.notificationPushRepository.save({
        user: currentUser,
        ...createNotificationPushDto,
      });
  }

  private async removePush(id: string): Promise<void> {
    await this.notificationPushRepository.delete({ id });
  }
}
