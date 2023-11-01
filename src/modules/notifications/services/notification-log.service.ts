import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotificationLog } from '@notifications/entities/notification-log.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NotificationLogService {
  constructor(
    @InjectRepository(NotificationLog)
    private notificationLogsRepository: Repository<NotificationLog>,
  ) {}
}
