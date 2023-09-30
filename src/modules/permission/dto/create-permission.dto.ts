import { ApiProperty } from '@nestjs/swagger';
import {
  MaxLength,
  IsString,
} from 'class-validator';

export class CreatePermissionDto {
  @ApiProperty({
    maxLength: 128,
  })
  @IsString()
  @MaxLength(128)
  name: string;
}
