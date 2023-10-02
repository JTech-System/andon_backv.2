// src/permission/permission.entity.ts
import { Entity, Column, ManyToMany } from 'typeorm';
import { Role } from '../../role/entities/role.entity';
import { BaseEntity } from '@utils/entities/base.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Permission extends BaseEntity {
  /** @name */
  @ApiProperty({
    maxLength: 128,
  })
  @Column({
    length: 128,
  })
  name: string;

  /** @action */
  @ApiProperty({
    maxLength: 128,
  })
  @Column({
    length: 128,
  })
  action: string;

  /** @resource */
  @ApiProperty({
    maxLength: 128,
  })
  @Column({
    length: 128,
  })
  resource: string;

  /** @roles */
  @ApiProperty({
    type: () => Role,
    isArray: true,
    description: 'A list of roles associated with the permision.',
  })
  @ManyToMany(() => Role, (role) => role.permissions)
  roles: Role[];

  @Column()
  bitmask: number;
}
