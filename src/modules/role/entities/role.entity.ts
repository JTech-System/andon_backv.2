// src/role/role.entity.ts
import { Entity, Column, ManyToMany, JoinTable, Index } from 'typeorm';
import { Permission } from '../../permission/entities/permission.entity';
import { BaseEntity } from '@utils/entities/base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '@users/entities/user.entity';
import { IsString, MaxLength } from 'class-validator';

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
    @Index()  // Added indexing for faster searches
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

    /**
     * Calculate the permission bitmask for the role.
     * This is a derived property and not stored in the database.
    */
    @ApiProperty()
    getPermissionBitmask(): number {
        return this.permissions.reduce((acc, permission) => acc | permission.bitmask, 0);
    }

    /** @users */
    @ApiProperty({
        type: () => User,
        isArray: true,
        description: 'A list of users associated with the role.',
    })
    @ManyToMany(() => User, user => user.roles)
    users: User[];
}
