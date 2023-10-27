import { ApiProperty } from '@nestjs/swagger';
import {
  MaxLength,
  IsString,
  IsEmail,
  Matches,
  IsArray,
  IsUUID,
} from 'class-validator';

export class CreateUserDto {
  
  @ApiProperty({
    maxLength: 128,
  })
  @IsString({ message: 'Name should be a string' })
  @MaxLength(128, {
    message: 'Name should not be longer than 128 characters',
  })
  name: string;

  @ApiProperty({
    maxLength: 128,
  })
  @IsString({ message: 'User ID should be a string' })
  @MaxLength(128, {
    message: 'User ID should not be longer than 128 characters',
  })
  user_id: string;


  @ApiProperty({
    maxLength: 128,
  })
  @IsString({ message: 'First name should be a string' })
  @MaxLength(128, {
    message: 'First name should not be longer than 128 characters',
  })
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
  @IsEmail({}, { message: 'Invalid email format' })
  @MaxLength(128, { message: 'Email should not be longer than 128 characters' })
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
      'Password must have at least 8 characters, including one uppercase letter, one lowercase letter, and one number',
  })
  password: string;

  @ApiProperty({ type: [String], description: 'Array of role IDs' })
  @IsArray()
  roles: string[];
}
