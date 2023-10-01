import { ApiProperty } from '@nestjs/swagger';
import {
  MaxLength,
  IsString,
  IsArray,
  ArrayNotEmpty,
  IsInt,
  IsNotEmpty,
} from 'class-validator';
export class CreateRoleDto {
  /** @name */
  @ApiProperty({
    maxLength: 128,
  })
  @IsNotEmpty({ message: 'Name should not be empty' })
  @IsString({ message: 'Name should be a string' })
  @MaxLength(128, { message: 'Name should not be longer than 128 characters' })
  name: string;

  /** @name */
  @ApiProperty({
    type: Number,
    isArray: true,
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  permissions: string[];
}
