import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateNotificationUpdateFieldDto {
  @ApiProperty()
  @IsString()
  @MaxLength(64)
  name: string;

  @ApiProperty({
    required: false,
  })
  @IsString()
  @MaxLength(64)
  @IsOptional()
  value?: string;
}
