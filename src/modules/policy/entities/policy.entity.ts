import { Entity, Column, ManyToMany, JoinTable, Index } from 'typeorm';
import { Role } from '../../role/entities/role.entity';
import { Permission } from '../../permission/entities/permission.entity';
import { BaseEntity } from '@utils/entities/base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsJSON, IsString, MaxLength, IsBoolean } from 'class-validator';
import { ActionType } from '../enums/action-type.enum'; 

@Entity()
export class Policy extends BaseEntity{
  @Index()
  @ApiProperty({
    maxLength: 128,
    description: 'Name of the policy',
    example: 'AdminAccess',
  })
  @IsString({ message: 'Name should be a string' })
  @Column({ type: 'varchar', length: 128 })
  name: string;

  @ApiProperty({
    maxLength: 128,
    description: 'Value of the policy',
    example: 'allow',
  })
  @IsString({ message: 'Value should be a string' })
  @Column({ type: 'varchar', length: 128 })
  value: string;

  @ApiProperty({
    description: 'Active status of the policy',
    example: true,
  })

  @Index()
  @IsBoolean({ message: 'Active should be a boolean' })
  @Column({ type: 'boolean' })
  active: boolean;

  @ApiProperty({
    maxLength: 128,
    description: 'Type of the policy',
    example: 'access',
  })
  @IsString({ message: 'Type should be a string' })
  @Column({ type: 'varchar', length: 128 })
  type: string;

  @Column({ type: 'json', nullable: true })
  @IsJSON()
  conditions: JSON;
  
  @ApiProperty({
    type: () => Role,
    isArray: true,
    description: 'A list of roles associated with the policy.',
  })
  @ManyToMany(() => Role, role => role.policies, { onDelete: 'CASCADE' })  
  @JoinTable()
  roles: Role[];

  @ApiProperty({
    type: () => Permission,
    isArray: true,
    description: 'A list of permissions associated with the policy.',
  })
  @ManyToMany(() => Permission, permission => permission.policies, { onDelete: 'CASCADE' })  
  @JoinTable()
  permissions: Permission[];
}
