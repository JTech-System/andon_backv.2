import { ApiProperty } from '@nestjs/swagger';
import {
  NotificationType,
  NotificationTypesArray,
} from '../enums/notification-type.enum';
import {
  NotificationOperation,
  NotificationOperationsArray,
} from '../enums/notification-operation.enum';
import {
  IsArray,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateNotificationUpdateFieldDto } from './create-notification-update-field.dto';
import { CreateNotificationStopFieldDto } from './create-notification-stop-field.dto';

export class CreateNotificationDto {
  @ApiProperty({
    maxLength: 64,
  })
  @IsString()
  @MaxLength(64)
  name: string;

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

  @ApiProperty()
  @IsArray()
  @IsString({
    each: true,
  })
  recipientsId: string[];

  @ApiProperty()
  @IsArray()
  @IsString({
    each: true,
  })
  groupsId: string[];

  @ApiProperty()
  @IsArray()
  @IsString({
    each: true,
  })
  managerGroupsId: string[];

  @ApiProperty({
    type: [CreateNotificationUpdateFieldDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateNotificationUpdateFieldDto)
  updateFields: CreateNotificationUpdateFieldDto[];

  @ApiProperty({
    type: [CreateNotificationStopFieldDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateNotificationStopFieldDto)
  stopFields: CreateNotificationStopFieldDto[];

  @ApiProperty({
    default: true,
  })
  active: boolean;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @Matches(/^(\*|([0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9])|\*\/([0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9])) (\*|([0-9]|1[0-9]|2[0-3])|\*\/([0-9]|1[0-9]|2[0-3])) (\*|([1-9]|1[0-9]|2[0-9]|3[0-1])|\*\/([1-9]|1[0-9]|2[0-9]|3[0-1])) (\*|([1-9]|1[0-2])|\*\/([1-9]|1[0-2])) (\*|([0-6])|\*\/([0-6]))$/, {
    message:
      'Invalid cron time, more information: https://en.wikipedia.org/wiki/Cron',
  })
  cronTime?: string;

  @ApiProperty({
    required: false,
    maxLength: 32,
  })
  @IsString()
  @MaxLength(32)
  @IsOptional()
  recipientGroup?: string;

  @ApiProperty({
    required: false,
    maxLength: 32,
  })
  @IsString()
  @MaxLength(32)
  @IsOptional()
  recipientManagerGroup?: string;

  @ApiProperty({
    required: false,
    maxLength: 32,
  })
  @IsString()
  @MaxLength(32)
  @IsOptional()
  recipientAgentsGroup?: string;

  @ApiProperty({
    required: false,
    maxLength: 32,
  })
  @IsString()
  @MaxLength(32)
  @IsOptional()
  recipientUser?: string;
}
