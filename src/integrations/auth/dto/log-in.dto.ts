import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, MaxLength, IsNotEmpty } from 'class-validator';

export class LogInDto {
  @ApiProperty()  
  @IsNotEmpty()
  @IsString()
  @MaxLength(128)
  user_id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(128)
  password: string;
}
