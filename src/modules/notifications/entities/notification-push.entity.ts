import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '@users/entities/user.entity';

@Entity()
export class NotificationPush {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @CreateDateColumn()
  createdOn: Date;

  @ApiProperty()
  @ManyToOne(() => User, (user) => user.id, {
    onDelete: 'CASCADE',
  })
  user: User;

  @ApiProperty({
    maxLength: 256,
  })
  @Column({
    length: 256,
  })
  endpoint: string;

  @ApiProperty({
    maxLength: 64,
  })
  @Column({
    length: 64,
  })
  auth: string;

  @ApiProperty({
    maxLength: 128,
  })
  @Column({
    length: 128,
  })
  p256dh: string;
}
