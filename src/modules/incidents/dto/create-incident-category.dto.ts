import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class CreateIncidentCategoryDto {
  @ApiProperty({
    maxLength: 128,
  })
  @IsString()
  @MaxLength(128)
  value: string;
}
