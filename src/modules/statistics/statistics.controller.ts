import { Controller, Get, Query } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { StatisticsIncidentProductionLineDto } from './dto/statistics-incident-production-line.dto';
import { StatisticsIncidentAssignedGroupDto } from './dto/statistics-incident-assigned-group.dto';
import { DateValidationPipe } from '@utils/pipes/date-validation.pipe';

@ApiTags('Statistics')
@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get('incidents/count')
  @ApiQuery({
    name: 'startOn',
    type: Date,
  })
  @ApiQuery({
    name: 'endOn',
  })
  @ApiOkResponse({
    type: Number,
  })
  @ApiBearerAuth()
  async incidentsCount(
    @Query('startOn', new DateValidationPipe({ optional: false }))
    startOn: Date,
    @Query('endOn', new DateValidationPipe({ optional: false })) endOn: Date,
  ): Promise<number> {
    return await this.statisticsService.incidentsCount(startOn, endOn);
  }

  @Get('incidents/production-lines')
  @ApiQuery({
    name: 'startOn',
    type: Date,
  })
  @ApiQuery({
    name: 'endOn',
    type: Date,
  })
  @ApiOkResponse({
    type: [StatisticsIncidentProductionLineDto],
  })
  @ApiBearerAuth()
  async incidentsProductionLines(
    @Query('startOn', new DateValidationPipe({ optional: false }))
    startOn: Date,
    @Query('endOn', new DateValidationPipe({ optional: false })) endOn: Date,
  ): Promise<StatisticsIncidentProductionLineDto[]> {
    return await this.statisticsService.incidentsProductionLines(
      startOn,
      endOn,
    );
  }

  @Get('incidents/assigned-groups')
  @ApiQuery({
    name: 'startOn',
    type: Date,
  })
  @ApiQuery({
    name: 'endOn',
    type: Date,
  })
  @ApiOkResponse({
    type: [StatisticsIncidentAssignedGroupDto],
  })
  @ApiBearerAuth()
  async incidentsAssignedGroups(
    @Query('startOn', new DateValidationPipe({ optional: false }))
    startOn: Date,
    @Query('endOn', new DateValidationPipe({ optional: false })) endOn: Date,
  ): Promise<StatisticsIncidentAssignedGroupDto[]> {
    return await this.statisticsService.incidentsAssignedGroups(startOn, endOn);
  }
}
