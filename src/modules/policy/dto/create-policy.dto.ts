import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, IsNotEmpty, IsOptional, IsArray, IsObject, IsBoolean } from 'class-validator';
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
    description: 'Active status of the policy',
    example: true,
  })
  @IsBoolean({ message: 'Active should be a boolean' })
  @IsNotEmpty({ message: 'Active should not be empty' })
  active: boolean;

  @ApiProperty({
    maxLength: 128,
    description: 'Type of the policy',
    example: 'access',
  })
  @IsString({ message: 'Type should be a string' })
  @IsNotEmpty({ message: 'Type should not be empty' })
  @MaxLength(128, { message: 'Type should not be longer than 128 characters' })
  type: string; 

  @ApiProperty({
    type: Object,
    description: 'Conditions under which the policy is applicable',
    example: { location: 'USA' },
  })
  @IsObject({ message: 'Conditions should be an object' })
  @IsOptional()
  conditions: JSON;
}
