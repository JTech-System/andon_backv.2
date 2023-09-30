// src/role/role.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Permission } from '../../permission/entities/permission.entity';
import { BaseEntity } from '@utils/entities/base.entity';

@Entity()
export class Role extends BaseEntity {
    @Column()
    name: string;

    @ManyToMany(() => Permission, permission => permission.roles, { eager: true })
    @JoinTable()
    permissions: Permission[];
}
