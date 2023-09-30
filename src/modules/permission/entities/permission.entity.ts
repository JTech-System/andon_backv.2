// src/permission/permission.entity.ts
import { Entity, Column, ManyToMany } from 'typeorm';
import { Role } from '../../roles/entities/role.entity';
import { BaseEntity } from '@utils/entities/base.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Permission extends BaseEntity {
  @ApiProperty({
    maxLength: 128,
  })
  @Column({
    length: 128,
  })
  name: string;

  @ApiProperty({
    type: () => Role,
    isArray: true,
    description: 'A list of roles associated with the permision.',
  })
  @ManyToMany(() => Role, (role) => role.permissions)
  roles: Role[];
}
