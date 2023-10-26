import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateNotificationPushDto } from '@notifications/dto/create-notification-push.dto';
import { NotificationPush } from '@notifications/entities/notification-push.entity';
import { User } from '@users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NotificationPushService {
  constructor(
    @InjectRepository(NotificationPush)
    private notificationPushRepository: Repository<NotificationPush>,
  ) {}

  /**
   * Creates a new push notification if a notification with the same 'auth' and 'p256dh' values doesn't already exist.
   *
   * @param {CreateNotificationPushDto} createNotificationPushDto - The data for creating the push notification.
   * @param {User} currentUser - The user associated with the push notification.
   * @returns {Promise<void>} A promise that resolves when the push notification is created.
   */
  async create(
    createNotificationPushDto: CreateNotificationPushDto,
    currentUser: User,
  ): Promise<void> {
    // Check if a notification push with the same 'auth' and 'p256dh' values exists in the database.
    if (
      !(await this.notificationPushRepository.findOne({
        where: {
          auth: createNotificationPushDto.auth,
          p256dh: createNotificationPushDto.p256dh,
        },
      }))
    ) {
      // If no matching notification push is found, save the new push notification.
      await this.notificationPushRepository.save({
        user: currentUser,
        ...createNotificationPushDto,
      });
    }
  }

  async remove(id: string): Promise<void> {
    // Delete a notification push from the database based on its ID.
    await this.notificationPushRepository.delete({ id });
  }
}
