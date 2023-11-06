import { Entity, Column, ManyToMany, JoinTable, Index, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Role } from '../../role/entities/role.entity';
import { Permission } from '../../permission/entities/permission.entity';
import { BaseEntity } from '@utils/entities/base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsJSON, IsString, IsInt   } from 'class-validator';
import { Resource } from 'src/modules/resource/entities/resource.entity';

export enum PolicyAction {
  WRITE = 'write',
  FILTER = 'filter',
  EXECUTE = 'execute',
  READ = 'read',
  VIEW = 'view'
}

@Entity()
export class Policy extends BaseEntity {
  @Index()
  @ApiProperty({
    maxLength: 128,
    description: 'Name of the policy',
    example: 'AdminAccess',
  })
  @IsString()
  @Column({ type: 'varchar', length: 128 })
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
    maxLength: 128,
    description: 'The resource this policy applies to',
    example: 'incident',
  })
  @ManyToOne(() => Resource, (resource) => resource.policies)
  @JoinColumn({ name: 'resource_id' })
  resource: Resource;

  @ApiProperty({
    type: 'enum',
    enum: PolicyAction,
    default: PolicyAction.FILTER,
    description: 'The action this policy regulates',
    example: 'filter',
  })
  @Column({ 
    
    type: 'enum',
    enum: PolicyAction,
    default: PolicyAction.FILTER,
   })
  action: PolicyAction;

  @ApiProperty({
    type: 'json',
    description: 'Conditions under which the policy is evaluated',
    example: '{ "role": "admin", "state": "assigned" }',
  })
  @IsJSON()
  @Column({ type: 'json', nullable: true })
  conditions: any;

  @ApiProperty({
    description: 'Version number of the policy for tracking changes',
    example: 1,
  })
  @IsInt()
  @Column({ nullable: true })
  version: number;

  // Hierarchical relationship
  @ManyToOne(() => Policy, policy => policy.children, { nullable: true })
  parentPolicy: Policy;

  @OneToMany(() => Policy, policy => policy.parentPolicy)
  children: Policy[];

  @ManyToMany(() => Role, role => role.policies, { onDelete: 'CASCADE' })  
  @JoinTable()
  roles: Role[];

  @ManyToMany(() => Permission, permission => permission.policies, { onDelete: 'CASCADE' })  
  @JoinTable()
  permissions: Permission[];

}
