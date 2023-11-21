
import { ApiProperty } from '@nestjs/swagger';
import { MaxLength, IsString, IsNotEmpty, IsArray, ArrayMaxSize, ArrayMinSize } from 'class-validator';

export class PolicyPermissionsDto {
  /**
     * @Permission - The Permission associated with the policy. It should be a string and must not exceed 128 characters.
     */
  @ApiProperty({
    description: 'The Permissions associated with the policy.',
    type: [String],
    maxLength: 128,
  })
  @IsArray({ message: 'Permissions should be an array of strings' })
  @ArrayMinSize(1, { message: 'At least one Permission is required' })
  @ArrayMaxSize(50, { message: 'Cannot have more than 50 Permissions' }) // Adjust the max size as needed
  @IsString({ each: true, message: 'Each Permission should be a string' })
  @IsNotEmpty({ each: true, message: 'Each Permission should not be empty' })
  @MaxLength(128, { each: true, message: 'Each Permission should not be longer than 128 characters' })
  permissions: string[];

}