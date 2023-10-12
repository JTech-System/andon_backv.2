import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class CreateNotificationCloseFieldDto {
  @ApiProperty()
  @IsString()
  @MaxLength(64)
  name: string;

  @ApiProperty()
  @IsString()
  @MaxLength(64)
  value: string;
}
