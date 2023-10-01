import { ApiProperty } from '@nestjs/swagger';
import { MaxLength, IsString } from 'class-validator';

export class CreatePolicyDto {
    /** @name */
    @ApiProperty({
      maxLength: 128,
    })
    @IsString()
    @MaxLength(128)
    name: string;
    
    /** @action */
    @ApiProperty({
      maxLength: 128,
    })
    @IsString()
    @MaxLength(128)
    action: string;

    /** @resource */
    @ApiProperty({
      maxLength: 128,
    })
    @IsString()
    @MaxLength(128)
    resource: string;
  }
