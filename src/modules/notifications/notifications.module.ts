import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './entities/notification.entity';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from '@users/users.module';
import { NotificationUpdateField } from './entities/notification-update-field.entity';
import { NotificationCloseField } from './entities/notification-close-field.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Notification,
      NotificationUpdateField,
      NotificationCloseField,
    ]),
    ConfigModule.forRoot(),
    UsersModule,
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService],
})
export class NotificationsModule {}
