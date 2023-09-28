import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, MaxLength } from 'class-validator';

export class LogInDto {
  @ApiProperty()
  @IsString()
  @IsEmail()
  @MaxLength(128)
  email: string;

  @ApiProperty()
  @IsString()
  @MaxLength(128)
  password: string;
}
