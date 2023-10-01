// src/role/role.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Permission } from '../../permission/entities/permission.entity';
import { BaseEntity } from '@utils/entities/base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '@users/entities/user.entity';

@Entity()
export class Role extends BaseEntity {
    /** @name */

    @ApiProperty({
        maxLength: 128,
      })
      @Column({
        length: 128,
      })      
    name: string;

    /** @permissions */
    @ApiProperty({
        type: () => Permission,
        isArray: true,
        description: 'A list of permissions associated with the role.',
    })
    @ManyToMany(() => Permission, permission => permission.roles, { eager: true })
    @JoinTable()
    permissions: Permission[];

  @ManyToMany(() => User, user => user.roles)
  users: User[];
}
