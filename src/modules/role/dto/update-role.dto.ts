import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from '@utils/dto/base.dto';
import {
  MaxLength,
  IsString,
  IsArray,
  ArrayNotEmpty,
  IsNotEmpty,
  ArrayUnique,
} from 'class-validator';

export class UpdateRoleDto {
  /** @name */
  @ApiProperty({
    description: 'Name of the role',
    maxLength: 128,
  })
  @IsNotEmpty({ message: 'Name should not be empty' })
  @IsString({ message: 'Name should be a string' })
  @MaxLength(128, { message: 'Name should not be longer than 128 chara+cters' })
  name: string;

  /** @permissions */
  @ApiProperty({
    description: 'Array of permission identifiers associated with the role',
    type: String,
    isArray: true,
  })
  @IsArray({ message: 'Permissions should be an array' })
  @ArrayNotEmpty({ message: 'Permissions should not be empty' })
  @IsString({ each: true, message: 'Each permission should be a string identifier' })
  @ArrayUnique({ message: 'Permissions should be unique' })
  permissions: string[];
}