import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Notification } from './notification.entity';
import { BaseEntity } from '@utils/entities/base.entity';

@Entity()
export class NotificationCloseField extends BaseEntity {
  @ApiProperty()
  @Column({
    length: 64,
  })
  name: string;

  @ApiProperty()
  @Column({
    length: 64,
  })
  value: string;

  @ManyToOne(() => Notification, (notification) => notification.id, {
    onDelete: 'CASCADE',
  })
  notification: Notification;
}
