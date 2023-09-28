import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from '@utils/dto/base.dto';

export class ResponseUserDto extends BaseDto {
  @ApiProperty({
    maxLength: 128,
  })
  firstName: string;

  @ApiProperty({
    maxLength: 128,
  })
  lastName: string;

  @ApiProperty({
    maxLength: 128,
  })
  email: string;

  @ApiProperty({
    maxLength: 13,
  })
  phone: string;
}
