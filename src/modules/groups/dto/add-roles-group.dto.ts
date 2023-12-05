import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  MaxLength,
  IsOptional,
  IsBoolean,
  IsArray,
  ArrayNotEmpty,
  ArrayUnique,
} from 'class-validator';

export class GroupRolesDto {
  /** @users */
  @ApiProperty({
    description: 'Array of roles identifiers associated with the group',
    type: String,
    isArray: true,
    example: '["477854f5-f2de-48dc-ae30-3b7498273576"]',
  })
  @IsArray({ message: 'Users should be an array' })
  @IsString({ each: true, message: 'Each users should be a string identifier' })
  @ArrayUnique({ message: 'Role should be unique' })
  roles: string[];
}
