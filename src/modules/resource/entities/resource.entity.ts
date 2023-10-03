import { Permission } from 'src/modules/permission/entities/permission.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '@utils/entities/base.entity';

@Entity()
export class Resource extends BaseEntity {
  @ApiProperty({
    maxLength: 128,
    description: 'Name of the resource',
    example: 'document',
  })
  @Column({
    length: 128,
  })
  name: string;

  @ApiProperty({
    maxLength: 256,
    description: 'Description of the resource',
    example: 'A resource representing documents in the system',
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

  @ApiProperty({
    description: 'The date and time when the resource was created',
    example: '2023-10-10T12:00:00Z',
  })
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  createdOn: Date;

  @ApiProperty({
    description: 'The date and time when the resource was last updated',
    example: '2023-10-10T12:00:00Z',
  })
  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  updatedOn: Date;

}
