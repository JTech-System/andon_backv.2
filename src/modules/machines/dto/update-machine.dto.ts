import { ApiProperty } from '@nestjs/swagger';

export class UpdateMachineDto {
  @ApiProperty({
    maxLength: 128,
  })
  value: string;
}
