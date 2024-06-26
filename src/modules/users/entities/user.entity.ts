import { Entity, Column, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '@utils/entities/base.entity';
import { Role } from 'src/modules/role/entities/role.entity';
import { Group } from 'src/modules/groups/entities/group.entity';
import { NotificationPush } from 'src/modules/notifications/entities/notification-push.entity';

@Entity()
export class User extends BaseEntity {
  @ApiProperty({
    maxLength: 128,
  })
  @Column({
    length: 128,
    unique: true,
  })
  username: string;

  @ApiProperty({
    maxLength: 128,
  })
  @Column({
    length: 128,
  })
  firstName: string;

  @ApiProperty({
    maxLength: 128,
  })
  @Column({
    length: 128,
  })
  lastName: string;

  @ApiProperty({
    maxLength: 128,
    required: false,
  })
  @Column({
    length: 128,
    unique: true,
    nullable: true,
  })
  email?: string;

  @ApiProperty({
    maxLength: 13,
    required: false,
  })
  @Column({
    length: 13,
    nullable: true,
  })
  phone?: string;

  @ApiProperty()
  @Column({
    select: false,
  })
  passwordHash: string;

  @ApiProperty()
  @Column({
    default: true,
  })
  isActive: boolean;

  @ApiProperty({
    type: () => Role,
    isArray: true,
    description: 'A list of roles associated with the user.',
  })
  @ManyToMany(() => Role, (role) => role.users, { eager: true })
  @JoinTable()
  roles: Role[];

  @ApiProperty({
    type: () => Group,
    isArray: true,
    description: 'A list of groups associated with the user.',
  })
  @ManyToMany(() => Group, (group) => group.users)
  @JoinTable()
  groups: Group[];

  @OneToMany(
    () => NotificationPush,
    (notificationPush) => notificationPush.user,
  )
  notificationPush: NotificationPush[];
}
