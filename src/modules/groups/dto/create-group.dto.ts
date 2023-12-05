import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, IsOptional, IsBoolean } from 'class-validator';

export class CreateGroupDto {
  @ApiProperty({
    maxLength: 128,
    description: 'Name of the group',
    example: 'IT',
  })
  @IsString({ message: 'Name should be a string' })
  @MaxLength(128, { message: 'Name should not be longer than 128 characters' })
  name: string;

  @ApiProperty({
    description: 'Manager of the group',
  })
  @IsString({ message: 'manager should be a string' })
  @IsOptional()
  manager: string;

  @ApiProperty({
    maxLength: 256,
    description: 'Description of the group',
    example: 'A group representing documents in the system',
    required: false,
  })
  @IsString({ message: 'Description should be a string' })
  @IsOptional()
  @MaxLength(256, {
    message: 'Description should not be longer than 256 characters',
  })
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
}
