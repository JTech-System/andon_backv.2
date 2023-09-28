import { Entity, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '@utils/entities/base.entity';

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

  //Roles

  //Groups
}
