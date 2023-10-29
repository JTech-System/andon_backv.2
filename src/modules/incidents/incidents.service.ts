import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateIncidentDto } from './dto/create-incident.dto';
import { Incident } from './entities/incident.entity';
import { User } from '@users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Repository,
  Like,
  FindOptionsWhere,
  Between,
  FindManyOptions,
} from 'typeorm';
import { IncidentCategory } from './entities/incident-category.entity';
import { CreateIncidentCategoryDto } from './dto/create-incident-category.dto';
import { UpdateIncidentCategoryDto } from './dto/update-incident-category.dto';
import { IncidentStatus } from './enums/incident-status.enum';
import { ProductionLinesService } from '@production-lines/production-lines.service';
import { PaginationIncidentDto } from './dto/pagination-incident.dto';
import { UpdateIncidentDto } from './dto/update-incident.dto';
import { MachinesService } from '@machines/machines.service';
import { CreateIncidentCommentDto } from './dto/create-incident-comment.dto';
import { IncidentComment } from './entities/incident-comment.entity';
import { NotificationOperation } from '../notifications/enums/notification-operation.enum';
import { GroupsService } from '@groups/group.service';
import { UsersService } from '@users/users.service';
import { NotificationsService } from '@notifications/services/notifications.service';
import { NotificationSendService } from '@notifications/services/notification-send.service';

@Injectable()
export class IncidentsService {
  constructor(
    @InjectRepository(Incident)
    private incidentsRepository: Repository<Incident>,
    @InjectRepository(IncidentCategory)
    private incidentCategoriesRepository: Repository<IncidentCategory>,
    @InjectRepository(IncidentComment)
    private incidentCommentsRepository: Repository<IncidentComment>,
    private productionLinesService: ProductionLinesService,
    private machinesService: MachinesService,
    private groupsService: GroupsService,
    private usersService: UsersService,
    private notificationSendService: NotificationSendService,
  ) {}

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
    const category = await this.findOneCategory(createIncidentDto.category);
    const productionLine = await this.productionLinesService.findOne(
      createIncidentDto.productionLine,
    );

    const incident = await this.incidentsRepository.save({
      ...createIncidentDto,
      number: await this.createNumber(),
      createdBy: currentUser,
      updatedBy: currentUser,
      status: IncidentStatus.UNASSIGNED,
      category,
      productionLine,
    });

    this.notificationSendService.send(
      'incident',
      NotificationOperation.CREATE,
      incident,
    );

    return await this.findOne(incident.id);
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
  ): Promise<PaginationIncidentDto> {
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

    // Find and replaces the id values
    updateIncidentDto['category'] = await this.findOneCategory(
      updateIncidentDto.categoryId,
    );
    delete updateIncidentDto['categoryId'];
    updateIncidentDto['productionLine'] =
      await this.productionLinesService.findOne(
        updateIncidentDto['productionLineId'],
      );
    delete updateIncidentDto['productionLineId'];

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

    // Set times
    const lastStatus = lastIncident.status,
      status = updateIncidentDto.status;

    if (lastStatus != status) {
      if (
        status == IncidentStatus.IN_PROGRESS ||
        status == IncidentStatus.CLOSED ||
        status == IncidentStatus.CANCEL
      ) {
        if (!lastIncident.inProgressOn)
          updateIncidentDto['inProgressOn'] = new Date();
      }
      if (status == IncidentStatus.CLOSED || status == IncidentStatus.CANCEL) {
        updateIncidentDto['closedOn'] = new Date();
        updateIncidentDto['closedBy'] = currentUser;
      }
    }

    // const lastStatus = lastIncident.status,
    //   status = updateIncidentDto.status;
    // const date = new Date();
    // if (lastStatus != status && status != IncidentStatus.CANCEL) {
    //   if (status == IncidentStatus.IN_PROGRESS) {
    //     if (
    //       lastStatus == IncidentStatus.UNASSIGNED ||
    //       lastStatus == IncidentStatus.ASSIGNED
    //     ) {
    //       if (lastIncident.inProgressTimeLapsed && lastIncident.inProgressOn)
    //         updateIncidentDto['inProgressTimeLapsed'] =
    //           date.getTime() -
    //           new Date(lastIncident.inProgressOn).getTime() +
    //           lastIncident.inProgressTimeLapsed;
    //       else
    //         updateIncidentDto['inProgressTimeLapsed'] =
    //           date.getTime() - new Date(lastIncident.createdOn).getTime();
    //     }
    //     updateIncidentDto['inProgressOn'] = date;
    //   } else if (lastStatus == IncidentStatus.IN_PROGRESS) {
    //     updateIncidentDto['inProgressOn'] = date;
    //   }
    //   if (status == IncidentStatus.CLOSED) {
    //     updateIncidentDto['closedBy'] = currentUser;
    //     if (lastIncident.inProgressOn) {
    //       if (lastIncident.closeTimeLapsed && lastIncident.closedOn)
    //         updateIncidentDto['closeTimeLapsed'] =
    //           date.getTime() -
    //           new Date(lastIncident.closedOn).getTime() +
    //           lastIncident.closeTimeLapsed;
    //       else
    //         updateIncidentDto['closeTimeLapsed'] =
    //           date.getTime() - new Date(lastIncident.inProgressOn).getTime();
    //     } else {
    //       updateIncidentDto['inProgressOn'] = date;
    //       updateIncidentDto['inProgressTimeLapsed'] = updateIncidentDto[
    //         'closeTimeLapsed'
    //       ] = date.getTime() - new Date(lastIncident.createdOn).getTime();
    //     }
    //     updateIncidentDto['closedOn'] = date;
    //   } else if (lastStatus == IncidentStatus.CLOSED) {
    //     updateIncidentDto['closedOn'] = date;
    //   }
    // }

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

    await this.incidentsRepository.update(
      { id },
      { updatedBy: currentUser, ...updateIncidentDto },
    );

    const incident = await this.findOne(id);
    this.notificationSendService.send(
      'incident',
      NotificationOperation.UPDATE,
      incident,
      lastIncident,
    );
    return incident;
  }

  async remove(id: string): Promise<void> {
    this.notificationSendService.send(
      'incident',
      NotificationOperation.DELETE,
      await this.findOne(id),
    );
    await this.incidentsRepository.delete({ id });
  }

  // Incident Categories

  async createCategory(
    createIncidentCategoryDto: CreateIncidentCategoryDto,
  ): Promise<IncidentCategory> {
    const incidentCategory = await this.incidentCategoriesRepository.save(
      createIncidentCategoryDto,
    );
    return await this.findOneCategory(incidentCategory.id);
  }

  async findAllCategories(): Promise<IncidentCategory[]> {
    return await this.incidentCategoriesRepository.find({
      order: {
        value: 'ASC',
      },
    });
  }

  async findOneCategory(id: string): Promise<IncidentCategory> {
    const incidentCategory = await this.incidentCategoriesRepository.findOne({
      where: {
        id,
      },
    });
    if (incidentCategory) return incidentCategory;
    throw new NotFoundException('Incident category not found');
  }

  async updateCategory(
    id: string,
    updateIncidentCategoryDto: UpdateIncidentCategoryDto,
  ): Promise<IncidentCategory> {
    await this.findOneCategory(id);
    await this.incidentCategoriesRepository.update(
      { id },
      updateIncidentCategoryDto,
    );
    return await this.findOneCategory(id);
  }

  async deleteCategory(id: string): Promise<void> {
    await this.findOneCategory(id);
    await this.incidentCategoriesRepository.delete({ id });
  }

  // Incident Comments

  async createComment(
    createIncidentCommentDto: CreateIncidentCommentDto,
    currentUser: User,
  ): Promise<Incident> {
    const incident = await this.findOne(createIncidentCommentDto.incidentId);
    await this.incidentCommentsRepository.save({
      createdBy: currentUser,
      incident,
      ...createIncidentCommentDto,
    });
    return await this.findOne(incident.id);
  }
}
