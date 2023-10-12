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
import { CreateNotificationCloseFieldDto } from './create-notification-close-field.dto';

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

  @ApiProperty()
  @IsArray()
  @IsString({
    each: true,
  })
  recipientsId: string[];

  @ApiProperty({
    type: [CreateNotificationUpdateFieldDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateNotificationUpdateFieldDto)
  updateFields: CreateNotificationUpdateFieldDto[];

  @ApiProperty({
    type: [CreateNotificationCloseFieldDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateNotificationCloseFieldDto)
  closeFields: CreateNotificationCloseFieldDto[];

  @ApiProperty()
  @IsString()
  @IsOptional()
  @Matches(/^((((\d+,)+\d+|(\d+(\/|-)\d+)|\d+|\*) ?){5,7})$/, {
    message:
      'Invalid cron time, more information: https://en.wikipedia.org/wiki/Cron',
  })
  cronTime?: string;
}
