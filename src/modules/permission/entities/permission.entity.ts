import { Entity, Column, ManyToMany, Index } from 'typeorm';
import { Role } from '../../role/entities/role.entity';
import { BaseEntity } from '@utils/entities/base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

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
  @Index() // Added indexing
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
  @Index() // Added indexing
  action: string;

  /** 
   * @resource represents the resource on which the action can be performed.
   */
  @ApiProperty({
    maxLength: 128,
  })
  @IsString()
  @MaxLength(128)
  @Column({
    length: 128,
  })
  @Index() // Added indexing
  resource: string;

  /** 
   * @roles is a list of roles associated with the permission.
   */
  @ApiProperty({
    type: () => Role,
    isArray: true,
    description: 'A list of roles associated with the permission.',
  })
  @ManyToMany(() => Role, (role) => role.permissions)
  roles: Role[];

  /** 
   * @bitmask is used for fast permission checks.
   */
  @Column()
  bitmask: number;
}
