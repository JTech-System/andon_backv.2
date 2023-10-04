import { Incident } from '@incidents/entities/incident.entity';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationIncidentDto {
  @ApiProperty({
    type: [Incident],
  })
  incidents: Incident[];

  @ApiProperty()
  page: number;

  @ApiProperty()
  pages: number;

  @ApiProperty()
  length: number;
}
