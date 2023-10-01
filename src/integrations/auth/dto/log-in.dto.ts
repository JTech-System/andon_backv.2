import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, MaxLength, IsNotEmpty } from 'class-validator';

export class LogInDto {
  @ApiProperty()  
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @MaxLength(128)
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(128)
  password: string;
}
