import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Repository,
  Like,
  FindOptionsWhere,
  Between,
  FindManyOptions,
} from 'typeorm';
import { ProductionLinesService } from '@production-lines/production-lines.service';
import { MachinesService } from '@machines/machines.service';
import { GroupsService } from '@groups/group.service';
import { UsersService } from '@users/users.service';
import { NotificationSendService } from '@notifications/services/notification-send.service';
import { SocketsGateway } from 'src/integrations/sockets/sockets.gateway';
import { Incident } from '@incidents/entities/incident.entity';
import { CreateIncidentDto } from '@incidents/dto/create-incident.dto';
import { IncidentStatus } from '@incidents/enums/incident-status.enum';
import { NotificationOperation } from '@notifications/enums/notification-operation.enum';
import { PaginationIncidentDto } from '@incidents/dto/pagination-incident.dto';
import { UpdateIncidentDto } from '@incidents/dto/update-incident.dto';
import { IncidentCategoriesService } from './incident-categories.service';
import { PolicyService } from 'src/modules/policy/policy.service';
import { format, add } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { Parser } from 'json2csv';
@Injectable()
export class IncidentsService {
  constructor(
    @InjectRepository(Incident)
    private incidentsRepository: Repository<Incident>,
    private incidentCategoriesService: IncidentCategoriesService,
    private productionLinesService: ProductionLinesService,
    private machinesService: MachinesService,
    private groupsService: GroupsService,
    private usersService: UsersService,
    private policyService: PolicyService,
    private notificationSendService: NotificationSendService,
    private socketsGateway: SocketsGateway,
  ) { }

  async count(options?: FindManyOptions<Incident>): Promise<number> {
    return await this.incidentsRepository.count(options);
  }

  private async createNumber(): Promise<string> {
    const incidents = await this.incidentsRepository.find({
      order: { number: 'DESC' },
      take: 1,
    });
    if (incidents.length > 0) {
      const match = incidents[0].number.match(/\d+/)[0];
      return (
        'INC' +
        ('0'.repeat(Math.max(0, 5 - (+match + 1).toString().length)) +
          (+match + 1).toString())
      );
    }
    return 'INC00001';
  }

  async create(
    createIncidentDto: CreateIncidentDto,
    currentUser: User,
  ): Promise<Incident> {
    // Generate the number for the new incident
    const incidentNumber = await this.createNumber();
    // Use findBy with FindManyOptions to check for existing incidents with the same number
    const existingIncidents = await this.findBy({
      where: { number: incidentNumber },
    });

    // Check if any incidents were found
    if (existingIncidents.length > 0) {
      // Handle the duplicate incident case, e.g., throw an error
      throw new Error(`An incident with number ${incidentNumber} already exists.`);
    }

    // Continue with the creation process if no duplicate was found
    const category = await this.incidentCategoriesService.findOne(
      createIncidentDto.category,
    );
    const productionLine = await this.productionLinesService.findOne(
      createIncidentDto.productionLine,
    );

    const incident = await this.incidentsRepository.save({
      ...createIncidentDto,
      number: incidentNumber, // Use the generated number
      createdBy: currentUser,
      updatedBy: currentUser,
      status: IncidentStatus.UNASSIGNED,
      category,
      productionLine,
    });

    this.notificationSendService.send(
      'incident',
      NotificationOperation.CREATE,
      `/incidents/${incident.id}`,
      incident,
    );
    this.socketsGateway.sendIncident();

    return await this.findOne(incident.id);
  }


  private async findAllWhere(
    search?: string,
    status?: IncidentStatus,
    categoryId?: string,
    startCreatedOn?: Date,
    endCreatedOn?: Date,
    assignedGroupId?: string,
    currentUser?: User,
  ): Promise<FindOptionsWhere<Incident>[]> {
    let where: FindOptionsWhere<Incident>[] = [];
    if (search) {
      where = [
        { number: Like(`%${search}%`) },
        { description: Like(`%${search}%`) },
        { employee: Like(`%${search}%`) },
        {
          createdBy: [
            { firstName: Like(`%${search}%`) },
            { lastName: Like(`%${search}%`) },
          ],
        },
      ];
    }
    if (
      where.length == 0 &&
      (status ||
        categoryId ||
        startCreatedOn ||
        endCreatedOn ||
        assignedGroupId)
    )
      where.push({});
    where.map((field) => {
      if (status) {
        field.status = status;
      }
      if (categoryId) {
        field.category = {
          id: categoryId,
        };
      }
      if (startCreatedOn && endCreatedOn) {
        endCreatedOn.setHours(23, 59, 59, 999);
        field.createdOn = Between(startCreatedOn, endCreatedOn);
      }
      if (assignedGroupId) {
        field.assignedGroup = {
          id: assignedGroupId,
        };
      }
    });

    const policyWhereClauses =
      await this.policyService.getDataPolicyConditionsForUser(
        currentUser,
        'incidents',
      );

    return [...where, ...policyWhereClauses];
  }

  async findAll(
    pageSize: number,
    page: number,
    search?: string,
    status?: IncidentStatus,
    categoryId?: string,
    startCreatedOn?: Date,
    endCreatedOn?: Date,
    assignedGroupId?: string,
    currentUser?: User,
  ): Promise<PaginationIncidentDto> {
    const where = await this.findAllWhere(
      search,
      status,
      categoryId,
      startCreatedOn,
      endCreatedOn,
      assignedGroupId,
      currentUser,
    );

    const length = await this.incidentsRepository.count({ where });
    const pages = Math.ceil(length / pageSize);
    if (page > pages) page = 1;
    const min = (page - 1) * pageSize;

    return {
      incidents: await this.incidentsRepository.find({
        where,
        order: {
          createdOn: 'DESC',
        },
        relations: {
          category: true,
          createdBy: true,
          assignedTo: true,
          closedBy: true,
          assignedGroup: true,
          productionLine: true,
        },
        skip: min,
        take: pageSize,
      }),
      page,
      pages,
      length,
    };
  }

  async findBy(options?: FindManyOptions<Incident>): Promise<Incident[]> {
    return await this.incidentsRepository.find(options);
  }

  async findOne(id: string): Promise<Incident> {
    const incident = await this.incidentsRepository.findOne({
      where: {
        id,
      },
      relations: {
        createdBy: true,
        updatedBy: true,
        category: true,
        productionLine: true,
        machine: true,
        comments: {
          createdBy: true,
        },
        closedBy: true,
        assignedGroup: true,
        assignedTo: true,
      },
    });
    if (incident) {
      incident.comments = incident.comments.sort((a, b) => {
        return a.createdOn.getTime() - b.createdOn.getTime();
      });
      return incident;
    }
    throw new NotFoundException('Incident not found');
  }

  async update(
    id: string,
    updateIncidentDto: UpdateIncidentDto,
    currentUser: User,
  ): Promise<Incident> {
    const lastIncident = await this.findOne(id);

    if (lastIncident['inProgressOn']) {
      updateIncidentDto['inProgressOn'] = lastIncident['inProgressOn'];

    }// Find and replaces the id values

    if (updateIncidentDto.categoryId) {
      updateIncidentDto['category'] =
        await this.incidentCategoriesService.findOne(
          updateIncidentDto.categoryId,
        );
      delete updateIncidentDto['categoryId'];
    }
    if (updateIncidentDto['productionLineId']) {
      updateIncidentDto['productionLine'] =
        await this.productionLinesService.findOne(
          updateIncidentDto['productionLineId'],
        );
      delete updateIncidentDto['productionLineId'];
    }
    if (updateIncidentDto.assignedGroupId) {
      updateIncidentDto['assignedGroup'] = await this.groupsService.findOne(
        updateIncidentDto.assignedGroupId,
      );
      delete updateIncidentDto['assignedGroupId'];
    }
    if (updateIncidentDto.assignedToId) {
      updateIncidentDto['assignedTo'] = await this.usersService.findOne(
        updateIncidentDto.assignedToId,
      );
      delete updateIncidentDto['assignedToId'];
    }
    if (updateIncidentDto.machineId) {
      updateIncidentDto['machine'] = await this.machinesService.findOne(
        updateIncidentDto.machineId,
      );
      delete updateIncidentDto['machineId'];
    }
    if (updateIncidentDto.status) {
      // Set times
      const lastStatus = lastIncident.status,
        status = updateIncidentDto.status;

      if (lastStatus != status) {
        if (
          (
            status == IncidentStatus.IN_PROGRESS ||
            status == IncidentStatus.CLOSED ||
            status == IncidentStatus.CANCEL
          ) && lastIncident.inProgressOn == null

        ) {
          updateIncidentDto['inProgressOn'] = new Date();
        } else {
          updateIncidentDto['inProgressOn'] = lastIncident['inProgressOn']

        }
        if (
          status == IncidentStatus.CLOSED ||
          status == IncidentStatus.CANCEL
        ) {
          updateIncidentDto['closedOn'] = new Date();
          updateIncidentDto['closedBy'] = currentUser;
        }
      }

      const date = new Date();
      if (lastStatus != status) {//&& status != IncidentStatus.CANCEL
        if (status == IncidentStatus.CLOSED) {
          updateIncidentDto['closedBy'] = currentUser;
          if (lastIncident.inProgressOn) {
            if (lastIncident.closeTimeLapsed && lastIncident.closedOn)
              updateIncidentDto['closeTimeLapsed'] =
                date.getTime() -
                new Date(lastIncident.closedOn).getTime() +
                lastIncident.closeTimeLapsed;
            else
              updateIncidentDto['closeTimeLapsed'] =
                date.getTime() - new Date(lastIncident.createdOn).getTime();
          } else updateIncidentDto['inProgressOn'] = date;
          updateIncidentDto['closedOn'] = date;
        } else if (lastStatus == IncidentStatus.CLOSED) {
          updateIncidentDto['closedOn'] = date;
        }
      }
    }

    // Set undefined to null
    [
      'assignedTo',
      'machine',
      'priority',
      'resolutionTimeInMinutes',
      'proposedSolution',
      'closeNotes',
      'assignedGroup',
      'assignedTo',
    ].map((field) => {
      if (updateIncidentDto[field] == undefined)
        updateIncidentDto[field] = null;
    });

    let lastInProgressOn = !lastIncident['lastInProgressOn'] ? lastIncident['inProgressOn'] : lastIncident['lastInProgressOn'];

    console.log(lastInProgressOn);


    let additionalData = {
      lastInProgressOn: lastInProgressOn,
      updatedBy: currentUser
    }
    console.log(additionalData);
    await this.incidentsRepository.update(
      { id },
      { ...additionalData, ...updateIncidentDto },
    );

    const incident = await this.findOne(id);
    this.notificationSendService.send(
      'incident',
      NotificationOperation.UPDATE,
      `/incidents/${incident.id}`,
      incident,
      lastIncident,
    );
    this.socketsGateway.sendIncident();

    return incident;
  }

  async remove(id: string): Promise<void> {
    this.notificationSendService.send(
      'incident',
      NotificationOperation.DELETE,
      '/incidents',
      await this.findOne(id),
    );
    this.socketsGateway.sendIncident();
    await this.incidentsRepository.delete({ id });
  }

  private getFullName(user?: User): string | undefined {
    if (user) return user.firstName + ' ' + user.lastName;
    else return undefined;
  }

  msToTime(duration: number): string {
    const seconds = (duration / 1000) % 60;
    const minutes = (duration / (1000 * 60)) % 60;
    const hours = (duration / (1000 * 60 * 60)) % 24;
    const days = Math.floor(duration / (1000 * 60 * 60 * 24));
    return `${days} days, ${Math.floor(hours)} hours, ${Math.floor(minutes)} minutes`;
  }

  
async generateCSV(
  search?: string,
  status?: IncidentStatus,
  categoryId?: string,
  startCreatedOn?: Date,
  endCreatedOn?: Date,
  assignedGroupId?: string,
  currentUser?: User,
): Promise<any> {
  const where = await this.findAllWhere(
    search,
    status,
    categoryId,
    startCreatedOn,
    endCreatedOn,
    assignedGroupId,
    currentUser,
  );

  const incidents = await this.incidentsRepository.find({
    where,
    relations: {
      createdBy: true,
      updatedBy: true,
      category: true,
      productionLine: true,
      assignedGroup: true,
      assignedTo: true,
      machine: true,
      closedBy: true,
    },
    order: {
      number: 'ASC',
    },
  });

  const timeZone = 'America/Mexico_City'; // Time zone for Mexico City

  const data: any[] = [];

  incidents.forEach((incident) => {
    const createdOnZoned = toZonedTime(incident.createdOn, timeZone);
    const updatedOnZoned = toZonedTime(incident.updatedOn, timeZone);
    const inProgressOnZoned = incident.inProgressOn ? toZonedTime(incident.inProgressOn, timeZone) : null;
    const closedOnZoned = incident.closedOn ? toZonedTime(incident.closedOn, timeZone) : null;

    data.push({
      id: incident.id,
      createdOn: format(createdOnZoned, 'yyyy-MM-dd HH:mm:ssXXX'),
      updatedOn: format(updatedOnZoned, 'yyyy-MM-dd HH:mm:ssXXX'),
      number: incident.number,
      description: incident.description,
      status: incident.status,
      employee: incident.employee,
      priority: incident.priority,
      proposedSolution: incident.proposedSolution,
      resolutionTimeInMinutes: incident.resolutionTimeInMinutes,
      closeNotes: incident.closeNotes,
      inProgressOn: inProgressOnZoned ? format(inProgressOnZoned, 'yyyy-MM-dd HH:mm:ssXXX') : null,
      closedOn: closedOnZoned ? format(closedOnZoned, 'yyyy-MM-dd HH:mm:ssXXX') : null,
      closeTimeLapsed: this.msToTime(incident.closeTimeLapsed),
      createdBy: this.getFullName(incident.createdBy),
      updateBy: this.getFullName(incident.updatedBy),
      category: incident.category.value,
      productionLine: incident.productionLine.value,
      assignedGroup: incident.assignedGroup ? incident.assignedGroup.name : undefined,
      assignedTo: this.getFullName(incident.assignedTo),
      machine: incident.machine ? incident.machine.value : undefined,
      closedBy: this.getFullName(incident.closedBy),
    });
  });

  const fields = [
    'id',
    'createdOn',
    'updatedOn',
    'number',
    'description',
    'status',
    'employee',
    'priority',
    'proposedSolution',
    'resolutionTimeInMinutes',
    'closeNotes',
    'inProgressOn',
    'closedOn',
    'closeTimeLapsed',
    'createdBy',
    'updateBy',
    'category',
    'productionLine',
    'assignedGroup',
    'assignedTo',
    'machine',
    'closedBy',
  ];

  const parser = new Parser({ fields });
  return parser.parse(data);
}
}