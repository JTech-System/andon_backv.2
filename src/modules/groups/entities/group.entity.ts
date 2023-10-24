import {
  Entity,
  Column,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
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
    type: Group,
  })
  @ManyToOne(() => User, (user) => user.id)
  manager: User;

  @ApiProperty({
    maxLength: 256,
    description: 'Description of the group',
    example: 'A group representing documents in the system',
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
  roles: Role[];

  /** @users */
  @ApiProperty({
    description: 'Array of user identifiers associated with the group',
    type: [User],
    isArray: true,
  })
  @ManyToMany(() => User)
  @JoinTable()
  users: User[];
}
