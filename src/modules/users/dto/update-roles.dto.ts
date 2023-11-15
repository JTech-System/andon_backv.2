import { ApiProperty } from '@nestjs/swagger';
import { ArrayUnique, IsArray, IsString } from 'class-validator';

export class UpdateUserRolesDto {
  @ApiProperty({
    description: 'Array of roles identifiers associated with the user',
    type: String,
    isArray: true,
  })
  @IsArray({ message: 'roles should be an array' })
  @IsString({ each: true, message: 'Each roles should be a string identifier' })
  @ArrayUnique({ message: 'roles should be unique' })
  roles: string[];
}
