import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './entities/notification.entity';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from '@users/users.module';
import { NotificationUpdateField } from './entities/notification-update-field.entity';
import { NotificationPush } from './entities/notification-push.entity';
import { NotificationStopField } from './entities/notification-stop-field.entity';
import { GroupsModule } from '@groups/group.module';
import { NotificationsService } from './services/notifications.service';
import { NotificationPushService } from './services/notification-push.service';
import { NotificationSendService } from './services/notification-send.service';
import { NotificationLog } from './entities/notification-log.entity';
import { NotificationLogService } from './services/notification-log.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Notification,
      NotificationUpdateField,
      NotificationStopField,
      NotificationPush,
      NotificationLog,
    ]),
    ConfigModule.forRoot(),
    UsersModule,
    GroupsModule,
  ],
  controllers: [NotificationsController],
  providers: [
    NotificationsService,
    NotificationPushService,
    NotificationSendService,
    NotificationLogService,
  ],
  exports: [NotificationsService, NotificationSendService],
})
export class NotificationsModule {}
