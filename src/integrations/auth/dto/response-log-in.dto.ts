import { ApiProperty } from '@nestjs/swagger';
import { ResponseUserDto } from '@users/dto/response-user.dto';

export class ResponseLogInDto {
  @ApiProperty()
  token: string;

  @ApiProperty({
    type: ResponseUserDto,
  })
  user: ResponseUserDto;

  @ApiProperty()
  permissions: any;
}
