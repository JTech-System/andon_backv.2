import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '@utils/entities/base.entity';
import {
  NotificationType,
  NotificationTypesArray,
  NotificationTypesArrayTransformer,
} from '../enums/notification-type.enum';
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import {
  NotificationOperation,
  NotificationOperationsArray,
  NotificationOperationsArrayTransformer,
} from '../enums/notification-operation.enum';
import { ResponseUserDto } from '@users/dto/response-user.dto';
import { User } from '@users/entities/user.entity';
import { NotificationUpdateField } from './notification-update-field.entity';
import { NotificationCloseField } from './notification-close-field.entity';

@Entity()
export class Notification extends BaseEntity {
  @ApiProperty({
    enum: NotificationTypesArray,
    type: [NotificationType],
  })
  @Column({
    type: 'simple-array',
    transformer: NotificationTypesArrayTransformer,
  })
  types: NotificationType[];

  @ApiProperty({
    maxLength: 64,
  })
  @Column({
    length: 64,
  })
  entity: string;

  @ApiProperty({
    enum: NotificationOperationsArray,
    type: [NotificationOperation],
  })
  @Column({
    type: 'simple-array',
    transformer: NotificationOperationsArrayTransformer,
  })
  operations: NotificationOperation[];

  @ApiProperty({
    maxLength: 128,
    required: false,
  })
  @Column({
    length: 128,
    nullable: true,
  })
  subject?: string;

  @ApiProperty()
  @Column({
    type: 'text',
  })
  body: string;

  @ApiProperty({
    type: [ResponseUserDto],
  })
  @ManyToMany(() => User)
  @JoinTable()
  recipients: User[];

  @ApiProperty({
    type: [NotificationUpdateField],
  })
  @OneToMany(() => NotificationUpdateField, (field) => field.notification)
  updateFields: NotificationUpdateField[];

  @ApiProperty({
    type: [NotificationCloseField],
  })
  @OneToMany(() => NotificationCloseField, (field) => field.notification)
  closeFields: NotificationCloseField[];

  @ApiProperty({
    required: false,
  })
  @Column({
    length: 32,
    nullable: true,
  })
  cronTime?: string;
}
