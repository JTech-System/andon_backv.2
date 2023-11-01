import { ApiProperty } from '@nestjs/swagger';

export class CreateNotificationPushDto {
  @ApiProperty({
    maxLength: 256,
  })
  endpoint: string;

  @ApiProperty({
    maxLength: 64,
  })
  auth: string;

  @ApiProperty({
    maxLength: 128,
  })
  p256dh: string;
}
