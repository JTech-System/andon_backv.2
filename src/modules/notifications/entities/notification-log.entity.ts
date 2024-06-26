import { ApiProperty } from '@nestjs/swagger';
import { User } from '@users/entities/user.entity';
import { BaseEntity } from '@utils/entities/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class NotificationLog extends BaseEntity {
  @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
  recipient: User;

  @ApiProperty({
    maxLength: 128,
  })
  @Column({
    length: 128
  })
  url: string;

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
    default: false,
  })
  @Column({
    default: false,
  })
  seen: boolean;
}
