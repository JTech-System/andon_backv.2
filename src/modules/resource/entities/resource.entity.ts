import { Permission } from 'src/modules/permission/entities/permission.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '@utils/entities/base.entity';

@Entity()
export class Resource extends BaseEntity {
  @ApiProperty({
    maxLength: 128,
    description: 'Name of the resource',
    example: 'password',
  })
  @Column({
    length: 128,
  })
  name: string;
  @ApiProperty({
    maxLength: 128,
    description: 'Name of the table',
    example: 'Users',
  })
  @Column({
    length: 128,
  })
  table: string;
  
  @ApiProperty({
    maxLength: 256,
    description: 'Description of the resource',
    example: 'A resource representing user password field',
  })
  @Column({
    length: 256,
    nullable: true,
  })
  description: string;

  @ApiProperty({
    description: 'The type or category of the resource',
    example: 'file',
  })
  @Column({
    length: 128,
    nullable: true,
  })
  type: string;

  @ApiProperty({
    description: 'Indicates whether the resource is active or not',
    example: true,
  })
  @Column({
    default: true,
  })
  isActive: boolean;

  @ApiProperty({
    description: 'The permissions associated with the resource',
    type: () => Permission,
    isArray: true,
  })
  @ManyToMany(() => Permission, (permission) => permission.resources, {
    eager: true,
    cascade: true,
  })
  permissions: Permission[];  

}
