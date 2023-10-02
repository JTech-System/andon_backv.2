import { Entity, Column, ManyToMany, JoinTable, Index } from 'typeorm';
import { Role } from '../../role/entities/role.entity';
import { Permission } from '../../permission/entities/permission.entity';
import { BaseEntity } from '@utils/entities/base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsJSON, IsString, MaxLength } from 'class-validator';
import { ActionType } from '../enums/action-type.enum'; 

@Entity()
export class Policy extends BaseEntity{

  @Index()  // Adding indexing for faster queries
  @Column({ type: 'varchar', length: 255 })
  userId: string;

  @Index()  // Adding indexing for faster queries
  @Column({ type: 'enum', enum: ActionType })  // Using enum for actions
  action: ActionType;

  @Index()  // Adding indexing for faster queries
  @Column({ type: 'varchar', length: 255 })
  @IsString()
  @MaxLength(255)
  resource: string;
/**
  @ApiProperty({
    type: () => Role,
    isArray: true,
    description: 'A list of roles associated with the policy.',
  })
  @ManyToMany(() => Role, role => role.policies, { onDelete: 'CASCADE' })  // Adding cascade delete
  @JoinTable()
  roles: Role[];

  @ApiProperty({
    type: () => Permission,
    isArray: true,
    description: 'A list of permissions associated with the policy.',
  })
  @ManyToMany(() => Permission, permission => permission.policies, { onDelete: 'CASCADE' })  // Adding cascade delete
  @JoinTable()
  permissions: Permission[];
  */

  @Column({ type: 'jsonb', nullable: true })
  @IsJSON()
  conditions: any;  // For complex conditions related to ABAC
}
