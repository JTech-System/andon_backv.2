import { ApiProperty } from '@nestjs/swagger';

export class CreateMachineDto {
  @ApiProperty({
    maxLength: 128,
  })
  value: string;
}
