import { ApiProperty } from '@nestjs/swagger';
import { MaxLength, IsString, IsNotEmpty, IsArray, ArrayMaxSize, ArrayMinSize } from 'class-validator';

export class CreatePermissionDto {
  /**
   * @name - The name of the permission. It should be a string and must not exceed 128 characters.
   */
  @ApiProperty({
    description: 'The name of the permission.',
    maxLength: 128,
  })
  @IsString({ message: 'Name should be a string' })
  @IsNotEmpty({ message: 'Name should not be empty' })
  @MaxLength(128, { message: 'Name should not be longer than 128 characters' })
  name: string;

  /**
   * @action - The action associated with the permission. It should be a string and must not exceed 128 characters.
   */
  @ApiProperty({
    description: 'The action associated with the permission.',
    maxLength: 128,
  })
  @IsString({ message: 'Action should be a string' })
  @IsNotEmpty({ message: 'Action should not be empty' })
  @MaxLength(128, { message: 'Action should not be longer than 128 characters' })
  action: string;
  
  /**
   * @resource - The resource associated with the permission. It should be a string and must not exceed 128 characters.
   */
  @ApiProperty({
    description: 'The resources associated with the permission.',
    type: [String],
    maxLength: 128,
  })
  @IsArray({ message: 'Resources should be an array of strings' })
  @ArrayMinSize(1, { message: 'At least one resource is required' })
  @ArrayMaxSize(50, { message: 'Cannot have more than 50 resources' }) // Adjust the max size as needed
  @IsString({ each: true, message: 'Each resource should be a string' })
  @IsNotEmpty({ each: true, message: 'Each resource should not be empty' })
  @MaxLength(128, { each: true, message: 'Each resource should not be longer than 128 characters' })
  resources: string[];
}
