import { ApiProperty } from '@nestjs/swagger';

export class StatisticsIncidentAssignedGroupDto {
  @ApiProperty()
  value: string;

  @ApiProperty()
  length: number;
}
