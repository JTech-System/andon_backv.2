import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, IsNotEmpty, IsOptional, IsArray, IsObject, IsEnum } from 'class-validator';
import { ActionType } from '../enums/action-type.enum';  

export class CreatePolicyDto {
  
  @ApiProperty({
    maxLength: 128,
    description: 'Name of the policy',
    example: 'AdminAccess',
  })
  @IsString({ message: 'Name should be a string' })
  @IsNotEmpty({ message: 'Name should not be empty' })
  @MaxLength(128, { message: 'Name should not be longer than 128 characters' })
  name: string;
    
  @ApiProperty({
    enum: ActionType,
    description: 'Action that the policy allows or denies',
    example: ActionType.READ, // Adjust the example based on your actual enum values
  })
  @IsEnum(ActionType, { message: 'Action should be one of the allowed actions' })
  @IsNotEmpty({ message: 'Action should not be empty' })
  action: ActionType;

  @ApiProperty({
    maxLength: 128,
    description: 'Resource that the policy applies to',
    example: 'document',
  })
  @IsString({ message: 'Resource should be a string' })
  @IsNotEmpty({ message: 'Resource should not be empty' })
  @MaxLength(128, { message: 'Resource should not be longer than 128 characters' })
  resource: string;

  @ApiProperty({
    description: 'User ID to whom the policy is assigned',
    example: '123',
  })
  @IsString({ message: 'UserId should be a string' })
  @IsNotEmpty({ message: 'UserId should not be empty' })
  userId: string;

  /*
  @ApiProperty({
    type: [String],
    description: 'Roles associated with the policy',
    example: ['Admin', 'Editor'],
  })
  @IsArray({ message: 'Roles should be an array' })
  @IsOptional()
  roles: string[];

  @ApiProperty({
    type: [String],
    description: 'Permissions associated with the policy',
    example: ['read', 'write'],
  })
  @IsArray({ message: 'Permissions should be an array' })
  @IsOptional()
  permissions: string[];
*/
  @ApiProperty({
    type: Object,
    description: 'Conditions under which the policy is applicable',
    example: { location: 'USA' },
  })
  @IsObject({ message: 'Conditions should be an object' })
  @IsOptional()
  conditions: any;
}
