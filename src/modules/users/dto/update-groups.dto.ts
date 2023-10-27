import { ApiProperty } from '@nestjs/swagger';
import { ArrayUnique, IsArray, IsString } from 'class-validator';



export class UpdateGroupsDto{
  
  @ApiProperty({
    description: 'Array of groups identifiers associated with the user',
    type: String,
    isArray: true,
  })
  @IsArray({ message: 'Groups should be an array' })  
  @IsString({ each: true, message: 'Each groups should be a string identifier' })
  @ArrayUnique({ message: 'Groups should be unique' })
  groups: string[];
}
