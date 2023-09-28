import { ApiProperty } from '@nestjs/swagger';

export class CreateIncidentDto {
  @ApiProperty({
    maxLength: 128,
  })
  employee: string;

  @ApiProperty()
  description: string;
}
