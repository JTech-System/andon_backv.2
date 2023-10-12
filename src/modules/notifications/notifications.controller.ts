import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Notification } from './entities/notification.entity';
import { NotificationOperation } from './enums/notification-operation.enum';

@ApiTags('Notifications')
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get('test')
  @ApiBearerAuth()
  async test(): Promise<void> {
    await this.notificationsService.send(
      'incident',
      NotificationOperation.create,
      {
        id: 'b3c9549b-2091-4c34-afcb-aeb1c4d6d22b',
        status: 'Unassigned',
      },
    );
  }

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
  @ApiBearerAuth()
  async findAll(): Promise<Notification[]> {
    return await this.notificationsService.findAll();
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
