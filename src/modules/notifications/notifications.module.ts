import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './entities/notification.entity';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Notification]),
    ConfigModule.forRoot(),
    // MailerModule.forRoot({
    //   transport: {
    //     host: 'smtp.office365.com',
    //     port: 587,
    //     secure: false,
    //     auth: {
    //       type: 'OAuth2',
    //       user: process.env.EMAIL_HOST,
    //       clientId: process.env.CLIENT_ID,
    //       clientSecret: process.env.CLIENT_SECRET,
    //       accessToken: `https://login.microsoftonline.com/${process.env.TENANT_ID}/oauth2/v2.0/token`,
    //     },
    //   },
    // }),
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService],
})
export class NotificationsModule {}
