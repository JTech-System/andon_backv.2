import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsArray,
  ArrayNotEmpty,
  ArrayUnique,
} from 'class-validator';

export class RolePermissionsDto {
  /** @permissions */
  @ApiProperty({
    description: 'Array of permission identifiers associated with the role',
    type: String,
    isArray: true,
  })
  @IsArray({ message: 'Permissions should be an array' })  
  @IsString({ each: true, message: 'Each permission should be a string identifier' })
  @ArrayUnique({ message: 'Permissions should be unique' })
  permissions: string[];
}