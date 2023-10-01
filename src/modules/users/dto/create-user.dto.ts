import { ApiProperty } from '@nestjs/swagger';
import { MaxLength, IsString, IsEmail, Matches } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    maxLength: 128,
  })
  @IsString()
  @MaxLength(128)
  firstName: string;

  @ApiProperty({
    maxLength: 128,
  })
  @IsString()
  @MaxLength(128)
  lastName: string;

  @ApiProperty({
    maxLength: 128,
  })
  @IsString()
  @IsEmail()
  @MaxLength(128)
  email: string;

  @ApiProperty({
    maxLength: 13,
    description: 'Eg. 4491234567 or +524491234567',
  })
  @IsString()
  @Matches(/^(?:\+\d{2})?\d{10}$/)
  @MaxLength(128)
  phone: string;

  @ApiProperty({
    description:
      'Minimum eight characters, at least one uppercase letter, one lowercase letter and one number',
  })
  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\W_]{8,}$/, {
    message:
      'password minimum eight characters, at least one uppercase letter, one lowercase letter and one number',
  })
  password: string;
  
  @ApiProperty({
    type: String,
    isArray: true,
    description: 'The IDs of roles to be associated with the user.',
    required: false,
  })
  roleIds?: string[];
}


