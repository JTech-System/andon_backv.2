import { ApiProperty } from '@nestjs/swagger';
import { MaxLength, IsString, IsNotEmpty } from 'class-validator';

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
    description: 'The resource associated with the permission.',
    maxLength: 128,
  })
  @IsString({ message: 'Resource should be a string' })
  @IsNotEmpty({ message: 'Resource should not be empty' })
  @MaxLength(128, { message: 'Resource should not be longer than 128 characters' })
  resource: string;
}
