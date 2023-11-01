import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateNotificationStopFieldDto {
  @ApiProperty({
    maxLength: 64,
  })
  @IsString()
  @MaxLength(64)
  name: string;

  @ApiProperty({
    maxLength: 64,
  })
  @IsString()
  @MaxLength(64)
  value: string;

  @ApiProperty({
    maxLength: 64,
    required: false,
  })
  @IsString()
  @MaxLength(64)
  @IsOptional()
  relation?: string;
}
