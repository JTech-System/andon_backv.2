import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotificationLog } from '@notifications/entities/notification-log.entity';
import { User } from '@users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NotificationLogService {
  constructor(
    @InjectRepository(NotificationLog)
    private notificationLogsRepository: Repository<NotificationLog>,
  ) {}

  async create(
    createNotificationLog: Partial<NotificationLog>,
  ): Promise<NotificationLog> {
    return await this.notificationLogsRepository.save(createNotificationLog);
  }

  async findAll(currentUser: User): Promise<NotificationLog[]> {
    const notificationLogs = await this.notificationLogsRepository.find({
      where: {
        seen: false,
        recipient: {
          id: currentUser.id,
        },
      },
      order: {
        createdOn: 'DESC',
      },
    });
    await Promise.all(
      notificationLogs.map(async (notification) => {
        await this.notificationLogsRepository.update(
          { id: notification.id },
          { seen: true },
        );
      }),
    );
    return notificationLogs;
  }
}
