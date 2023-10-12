import { ApiProperty } from '@nestjs/swagger';

class NameValueDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  value: string;
}

export class NotificationFieldsDto {
  [key: string]: NameValueDto[];
}
