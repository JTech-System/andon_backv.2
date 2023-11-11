import { CreateIncidentCommentDto } from '@incidents/dto/create-incident-comment.dto';
import { IncidentComment } from '@incidents/entities/incident-comment.entity';
import { Incident } from '@incidents/entities/incident.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@users/entities/user.entity';
import { Repository } from 'typeorm';
import { IncidentsService } from './incidents.service';
import { NotificationSendService } from '@notifications/services/notification-send.service';
import { NotificationOperation } from '@notifications/enums/notification-operation.enum';

@Injectable()
export class IncidentCommentsService {
  constructor(
    @InjectRepository(IncidentComment)
    private incidentCommentsRepository: Repository<IncidentComment>,
    private incidentsService: IncidentsService,
    private notificationSendService: NotificationSendService,
  ) {}

  async create(
    createIncidentCommentDto: CreateIncidentCommentDto,
    currentUser: User,
  ): Promise<Incident> {
    const lastIncident = await this.incidentsService.findOne(
      createIncidentCommentDto.incidentId,
    );
    await this.incidentCommentsRepository.save({
      createdBy: currentUser,
      incident: lastIncident,
      ...createIncidentCommentDto,
    });
    const incident = await this.incidentsService.findOne(lastIncident.id);
    this.notificationSendService.send(
      'incident',
      NotificationOperation.UPDATE,
      `/incidents/${incident.id}`,
      incident,
      lastIncident,
    );
    return incident;
  }
}
