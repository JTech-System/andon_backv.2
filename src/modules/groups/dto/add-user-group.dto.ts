import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, IsOptional, IsBoolean, IsArray, ArrayNotEmpty, ArrayUnique } from 'class-validator';

export class AddUserGroupDto {
  
  @ApiProperty({
    maxLength: 32,
    description: 'ID of the group',
    example: '<<id>>',
  })
  @IsString({ message: 'ID should be a string' })
  @MaxLength(32, { message: 'ID should not be longer than 32 characters' })
  group_id: string;

  @ApiProperty({
    maxLength: 32,
    description: 'ID of the user',
    example: '<<id>>',
  })
  @IsString({ message: 'ID should be a string' })
  @MaxLength(32, { message: 'ID should not be longer than 32 characters' })
  user_id: string;

}