import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class CreateProductionLineDto {
  @ApiProperty({
    maxLength: 128,
  })
  @IsString()
  @MaxLength(128)
  value: string;
}
