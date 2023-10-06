// src/role/role.entity.ts
import { Entity, Column, ManyToMany, JoinTable, Index } from 'typeorm';
import { Permission } from '../../permission/entities/permission.entity';
import { BaseEntity } from '@utils/entities/base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '@users/entities/user.entity';
import { IsString, MaxLength } from 'class-validator';
import { Policy } from 'src/modules/policy/entities/policy.entity';
import { Group } from 'src/modules/groups/entities/group.entity';

@Entity()
export class Role extends BaseEntity {
  /** @name */
  @ApiProperty({
    maxLength: 128,
    description: 'Name of the role',
  })
  @Column({
    length: 128,
  })
  @IsString()
  @MaxLength(128)
  @Index()
  name: string;

  /** @permissions */
  @ApiProperty({
    type: () => Permission,
    isArray: true,
    description: 'A list of permissions associated with the role.',
  })
  @ManyToMany(() => Permission, (permission) => permission.roles, {
    cascade: true,
  })
  @JoinTable()
  permissions: Permission[];

  /** @users */
  @ApiProperty({
    type: () => User,
    isArray: true,
    description: 'A list of users associated with the role.',
  })
  @ManyToMany(() => User, (user) => user.roles)
  users: User[];

  /** @policies */
  @ApiProperty({
    type: () => Policy,
    isArray: true,
    description: 'A list of policies associated with the role.',
  })
  @ManyToMany(() => Policy, (policy) => policy.roles)
  @JoinTable()
  policies: Policy[];

  /** @groups */
  @ApiProperty({
    type: () => Policy,
    isArray: true,
    description: 'A list of groups associated with the role.',
  })
  @ManyToMany(() => Policy, (policy) => policy.roles)
  @JoinTable()
  groups: Group[];
}
