import { Entity, Column, JoinTable, ManyToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '@utils/entities/base.entity';
import { Role } from 'src/modules/role/entities/role.entity';

@Entity()
export class User extends BaseEntity {
  @ApiProperty({
    maxLength: 128,
  })
  @Column({
    length: 128,
  })
  firstName: string;

  @ApiProperty({
    maxLength: 128,
  })
  @Column({
    length: 128,
  })
  lastName: string;

  @ApiProperty({
    maxLength: 128,
  })
  @Column({
    length: 128,
  })
  email: string;

  @ApiProperty({
    maxLength: 13,
  })
  @Column({
    length: 13,
  })
  phone: string;

  @ApiProperty()
  @Column({
    select: false,
  })
  passwordHash: string;

  @ApiProperty()
  @Column({
    default: true,
  })
  isActive: boolean;
  
  @ApiProperty({
    type: () => Role,
    isArray: true,
    description: 'A list of roles associated with the user.',
  })
  @ManyToMany(() => Role, role => role.users, { eager: true })
  @JoinTable()
  roles: Role[];
  
  

  //Groups
}
