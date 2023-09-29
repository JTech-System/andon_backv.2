import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class CreateIncidentDto {
  @ApiProperty({
    maxLength: 128,
  })
  @IsString()
  @MaxLength(128)
  employee: string;

  @ApiProperty({
    maxLength: 64,
  })
  @IsString()
  @MaxLength(64)
  category: string;

  @ApiProperty({
    maxLength: 64,
  })
  @IsString()
  @MaxLength(64)
  productionLine: string;

  @ApiProperty()
  @IsString()
  description: string;
}
