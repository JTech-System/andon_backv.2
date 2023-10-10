import { ApiProperty } from '@nestjs/swagger';
import {
  NotificationType,
  NotificationTypesArray,
} from '../enums/notification-type.enum';
import {
  NotificationOperation,
  NotificationOperationsArray,
} from '../enums/notification-operation.enum';
import { IsArray, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateNotificationDto {
  @ApiProperty({
    enum: NotificationTypesArray,
    type: [NotificationType],
  })
  @IsArray()
  @IsString({
    each: true,
  })
  types: NotificationType[];

  @ApiProperty({
    maxLength: 64,
  })
  @IsString()
  @MaxLength(64)
  entity: string;

  @ApiProperty({
    enum: NotificationOperationsArray,
    type: [NotificationOperation],
  })
  @IsArray()
  @IsString({
    each: true,
  })
  operations: NotificationOperation[];

  @ApiProperty({
    maxLength: 128,
    required: false,
  })
  @IsString()
  @MaxLength(128)
  @IsOptional()
  subject?: string;

  @ApiProperty()
  @IsString()
  body: string;
}
