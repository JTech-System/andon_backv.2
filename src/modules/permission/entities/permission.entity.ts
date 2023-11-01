import { Entity, Column, ManyToMany, Index, JoinTable } from 'typeorm';
import { Role } from '../../role/entities/role.entity';
import { BaseEntity } from '@utils/entities/base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';
import { Policy } from 'src/modules/policy/entities/policy.entity';
import { Resource } from 'src/modules/resource/entities/resource.entity';

@Entity()
export class Permission extends BaseEntity {
  /** 
   * @name represents the name of the permission.
   */
  @ApiProperty({
    maxLength: 128,
  })
  @IsString()
  @MaxLength(128)
  @Column({
    length: 128,
  })
  @Index()
  name: string;

  /** 
   * @action represents the action allowed by the permission.
   */
  @ApiProperty({
    maxLength: 128,
  })
  @IsString()
  @MaxLength(128)
  @Column({
    length: 128,
  })
  @Index()
  action: string;

  /** 
   * @resource represents the resource on which the action can be performed.
   */
  @ApiProperty({
    type: () => Resource,
    isArray: true,
    description: 'A list of resources associated with the permission.',
  })  
  @ManyToMany(() => Resource, resource => resource.permissions, {eager: true})
  @JoinTable()
  resources: Resource[];

  /** 
   * @roles is a list of roles associated with the permission.
   */
  @ApiProperty({
    type: () => Role,
    isArray: true,
    description: 'A list of roles associated with the permission.',
  })
  @ManyToMany(() => Role, role => role.permissions, {})
  @JoinTable()
  roles: Role[];

  @ApiProperty({
    type: () => Policy,
    isArray: true,
    description: 'A list of policies associated with the permission.',
  })
  
  @ManyToMany(() => Policy, policy => policy.permissions)
  policies: Policy[];


 
  
}
