import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, IsOptional, IsBoolean, IsArray, ArrayNotEmpty, ArrayUnique } from 'class-validator';

export class CreateGroupDto {
  
  @ApiProperty({
    maxLength: 128,
    description: 'Name of the group',
    example: 'document',
  })
  @IsString({ message: 'Name should be a string' })
  @MaxLength(128, { message: 'Name should not be longer than 128 characters' })
  name: string;

  @ApiProperty({
    maxLength: 128,
    description: 'Table name the group is ',
    example: 'Attachments',
  })
  @IsString({ message: 'Table should be a string' })
  @MaxLength(128, { message: 'Table should not be longer than 128 characters' })
  manager: string;

  @ApiProperty({
    maxLength: 256,
    description: 'Description of the group',
    example: 'A group representing documents in the system',
    required: false,
  })
  @IsString({ message: 'Description should be a string' })
  @IsOptional()
  @MaxLength(256, { message: 'Description should not be longer than 256 characters' })
  description?: string;

  @ApiProperty({
    maxLength: 128,
    description: 'The type or category of the group',
    example: 'file',
    required: false,
  })
  @IsString({ message: 'Type should be a string' })
  @IsOptional()
  @MaxLength(128, { message: 'Type should not be longer than 128 characters' })
  type?: string;

  @ApiProperty({
    description: 'Indicates whether the group is active or not',
    example: true,
    required: false,
  })
  @IsBoolean({ message: 'isActive should be a boolean' })
  @IsOptional()
  isActive?: boolean;
  
   /** @roles */
   @ApiProperty({
    description: 'Array of roles identifiers associated with the role',
    type: String,
    isArray: true,
  })
  @IsArray({ message: 'Permissions should be an array' })
  @ArrayNotEmpty({ message: 'Permissions should not be empty' })
  @IsString({ each: true, message: 'Each roles should be a string identifier' })
  @ArrayUnique({ message: 'Permissions should be unique' })
  roles: string[];

  /** @roles */
  @ApiProperty({
    description: 'Array of roles identifiers associated with the role',
    type: String,
    isArray: true,
  })
  @IsArray({ message: 'Permissions should be an array' })
  @ArrayNotEmpty({ message: 'Permissions should not be empty' })
  @IsString({ each: true, message: 'Each roles should be a string identifier' })
  @ArrayUnique({ message: 'Permissions should be unique' })
  users: string[];
  
}
