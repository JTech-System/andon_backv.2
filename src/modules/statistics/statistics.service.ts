import { IncidentStatus } from '@incidents/enums/incident-status.enum';
import { IncidentsService } from '@incidents/incidents.service';
import { Injectable } from '@nestjs/common';
import { StatisticsIncidentProductionLineDto } from './dto/statistics-incident-production-line.dto';
import { StatisticsIncidentAssignedGroupDto } from './dto/statistics-incident-assigned-group.dto';
import { Between } from 'typeorm';

@Injectable()
export class StatisticsService {
  constructor(private incidentsService: IncidentsService) {}

  async incidentsCount(startOn: Date, endOn: Date): Promise<number> {
    return await this.incidentsService.count({
      where: {
        createdOn: Between(startOn, endOn),
      },
    });
  }

  async incidentsProductionLines(
    startOn: Date,
    endOn: Date,
  ): Promise<StatisticsIncidentProductionLineDto[]> {
    const statisticsIncidentProductionLines: StatisticsIncidentProductionLineDto[] =
      [];
    const incidents = await this.incidentsService.findBy({
      relations: {
        productionLine: true,
      },
      select: {
        productionLine: {
          value: true,
        },
        status: true,
        createdOn: true,
        inProgressOn: true,
        closedOn: true,
      },
      where: {
        createdOn: Between(startOn, endOn),
      },
    });
    const productionLinesIncidentsValues: string[] = [];
    for (const incident of incidents)
      if (
        !productionLinesIncidentsValues.includes(incident.productionLine.value)
      )
        productionLinesIncidentsValues.push(incident.productionLine.value);
    productionLinesIncidentsValues.map((value) => {
      const productionLineIncidents = incidents.filter(
        (incident) => incident.productionLine.value == value,
      );
      let stopTime = 0;
      productionLineIncidents.map((incident) => {
        if (
          incident.status == IncidentStatus.CLOSED ||
          (incident.status == IncidentStatus.CANCEL && incident.closedOn)
        )
          stopTime +=
            new Date(incident.closedOn).getTime() -
            new Date(incident.createdOn).getTime();
      });
      statisticsIncidentProductionLines.push({
        value,
        length: productionLineIncidents.length,
        stopTime,
      });
    });
    return statisticsIncidentProductionLines;
  }

  async incidentsAssignedGroups(
    startOn: Date,
    endOn: Date,
  ): Promise<StatisticsIncidentAssignedGroupDto[]> {
    const statisticsIncidentAssignedGroups: StatisticsIncidentAssignedGroupDto[] =
      [];
    const incidents = await this.incidentsService.findBy({
      relations: {
        assignedGroup: true,
      },
      select: {
        assignedGroup: {
          name: true,
        },
        status: true,
      },
      where: {
        createdOn: Between(startOn, endOn),
      },
    });
    const assignedGroupsIncidentsValues: string[] = [];
    for (const incident of incidents)
      if (!assignedGroupsIncidentsValues.includes(incident.assignedGroup.name))
        assignedGroupsIncidentsValues.push(incident.assignedGroup.name);
    assignedGroupsIncidentsValues.map((value) => {
      const assignedGroupIncidents = incidents.filter(
        (incident) => incident.assignedGroup.name == value,
      );
      statisticsIncidentAssignedGroups.push({
        value,
        length: assignedGroupIncidents.length,
      });
    });
    return statisticsIncidentAssignedGroups;
  }
}
