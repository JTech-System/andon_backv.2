import { ApiProperty } from '@nestjs/swagger';

export abstract class BaseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  createdOn: Date;

  @ApiProperty()
  updatedOn: Date;
}
