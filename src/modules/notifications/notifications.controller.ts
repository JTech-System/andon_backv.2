import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Notification } from './entities/notification.entity';
import { CurrentUser } from '@auth/auth.decorator';
import { User } from '@users/entities/user.entity';
import { CreateNotificationPushDto } from './dto/create-notification-push.dto';
import { UUIDValidationPipe } from '@utils/pipes/uuid-validation.pipe';
import { NotificationsService } from './services/notifications.service';
import { NotificationLog } from './entities/notification-log.entity';
import { NotificationPushService } from './services/notification-push.service';
import { NotificationLogService } from './services/notification-log.service';

@ApiTags('Notifications')
@Controller('notifications')
export class NotificationsController {
  constructor(
    private readonly notificationsService: NotificationsService,
    private readonly notificationPushService: NotificationPushService,
    private readonly notificationLogService: NotificationLogService,
  ) {}

  // Inbox

  @Get('inbox')
  @ApiOkResponse({})
  @ApiBearerAuth()
  async findAllNotificationLogs(@CurrentUser() currentUser: User): Promise<NotificationLog[]> {
    return this.notificationLogService.findAll(currentUser);
  }

  // Push

  @Post('push')
  @ApiBearerAuth()
  async createPush(
    @Body() createNotificationPushDto: CreateNotificationPushDto,
    @CurrentUser() currentUser: User,
  ): Promise<void> {
    return await this.notificationPushService.create(
      createNotificationPushDto,
      currentUser,
    );
  }

  // Base

  @Post()
  @ApiCreatedResponse({
    type: Notification,
  })
  @ApiBearerAuth()
  async create(
    @Body() createNotificationDto: CreateNotificationDto,
  ): Promise<Notification> {
    return await this.notificationsService.create(createNotificationDto);
  }

  @Get()
  @ApiOkResponse({
    type: [Notification],
  })
  @ApiQuery({
    name: 'groupId',
    type: String,
    required: false,
  })
  @ApiBearerAuth()
  async findAll(
    @Query('groupId', new UUIDValidationPipe({ optional: true }))
    groupId?: string,
  ): Promise<Notification[]> {
    return await this.notificationsService.findAll(groupId);
  }

  @Get(':id')
  @ApiOkResponse({
    type: Notification,
  })
  @ApiBearerAuth()
  async findOne(@Param('id') id: string): Promise<Notification> {
    return await this.notificationsService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({
    type: Notification,
  })
  @ApiBearerAuth()
  async update(
    @Param('id') id: string,
    @Body() updateNotificationDto: UpdateNotificationDto,
  ): Promise<Notification> {
    return await this.notificationsService.update(id, updateNotificationDto);
  }

  @Delete(':id')
  @ApiOkResponse()
  @ApiBearerAuth()
  async remove(@Param('id') id: string): Promise<void> {
    return await this.notificationsService.remove(id);
  }
}
