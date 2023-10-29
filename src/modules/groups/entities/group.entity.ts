import { Entity, Column, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Role } from '../../role/entities/role.entity';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '@utils/entities/base.entity';

@Entity()
export class Group extends BaseEntity {
  @ApiProperty({
    maxLength: 128,
    description: 'Name of the group',
    example: 'document',
  })
  @Column({
    length: 128,
  })
  name: string;

  @ApiProperty({
    description: 'manager of the group',
    example: 'manager',
    type: () => User
  })
  @ManyToOne(() => User, { eager: true, nullable: true })
  @JoinColumn({ name: 'managerId' })
  manager: User;

  @ApiProperty({
    maxLength: 128,
    description: 'managerId of the group',
    example: '',
  })
  @Column({nullable: true})
  managerId: string;


  @ApiProperty({
    maxLength: 256,
    description: 'Description of the group',
    example: 'A group for being for IT Support',
    required: false,
  })
  @Column({
    length: 256,
    nullable: true,
  })
  description: string;

  @ApiProperty({
    description: 'The type or category of the group',
    example: 'file',
    required: false,
  })
  @Column({
    length: 128,
    nullable: true,
  })
  type: string;

  @ApiProperty({
    description: 'Indicates whether the group is active or not',
    example: true,
    required: false,
  })
  @Column({
    default: true,
  })
  isActive: boolean;

  /** @roles */
  @ApiProperty({
    description: 'Array of role identifiers associated with the group',
    type: Role,
    isArray: true,
  })
  @ManyToMany(() => Role)
  @JoinTable() // Add JoinTable if you want a join table for the ManyToMany relationship
  roles: Role[];

  /** @users */
  @ApiProperty({
    description: 'Array of user identifiers associated with the group',
    type: User,
    isArray: true,
  })
  @ManyToMany(() => User)
  users: User[];
}

