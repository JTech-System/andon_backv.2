import { ApiProperty } from '@nestjs/swagger';

export class StatisticsIncidentProductionLineDto {
  @ApiProperty()
  value: string;

  @ApiProperty()
  length: number;

  @ApiProperty()
  stopTime: number;
}
