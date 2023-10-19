import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './entities/notification.entity';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from '@users/users.module';
import { NotificationUpdateField } from './entities/notification-update-field.entity';
import { NotificationPush } from './entities/notification-push.entity';
import { NotificationStopField } from './entities/notification-stop-field.entity';
import { GroupsModule } from '@groups/group.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Notification,
      NotificationUpdateField,
      NotificationStopField,
      NotificationPush,
    ]),
    ConfigModule.forRoot(),
    UsersModule,
    GroupsModule,
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService],
  exports: [NotificationsService],
})
export class NotificationsModule {}
