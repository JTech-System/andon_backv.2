import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateIncidentDto } from './dto/create-incident.dto';
import { Incident } from './entities/incident.entity';
import { User } from '@users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, FindOptionsWhere, Between } from 'typeorm';
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
import { NotificationsService } from '../notifications/notifications.service';
import { NotificationOperation } from '../notifications/enums/notification-operation.enum';

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
    private notificationsService: NotificationsService,
  ) {}

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

    await this.notificationsService.send(
      'incident',
      NotificationOperation.create,
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
    groupId?: string,
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
      (status || categoryId || startCreatedOn || endCreatedOn || groupId)
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
      //GroupId
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
        },
        skip: min,
        take: pageSize,
      }),
      page,
      pages,
      length,
    };
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

    if (updateIncidentDto.groupId) {
      // group service
      delete updateIncidentDto['groupId'];
    }
    if (updateIncidentDto.assignedToId) {
      // user service
      delete updateIncidentDto['assignedToId'];
    }
    if (updateIncidentDto.machineId) {
      updateIncidentDto['machine'] = await this.machinesService.findOne(
        updateIncidentDto.machineId,
      );
      delete updateIncidentDto['machineId'];
    }

    // Set and unset close by
    if (
      lastIncident.status != updateIncidentDto.status &&
      updateIncidentDto.status == IncidentStatus.CLOSED
    ) {
      updateIncidentDto['closedBy'] = currentUser;
      updateIncidentDto['closedOn'] = new Date();
      if (lastIncident.timeLapsed && lastIncident.closedOn) {
        updateIncidentDto['timeLapsed'] =
          lastIncident.timeLapsed +
          updateIncidentDto['closedOn'].getTime() -
          new Date(lastIncident.closedOn).getTime();
      } else {
        updateIncidentDto['timeLapsed'] =
          updateIncidentDto['closedOn'].getTime() -
          new Date(lastIncident.createdOn).getTime();
      }
    } else if (
      lastIncident.status != updateIncidentDto.status &&
      lastIncident.status == IncidentStatus.CLOSED
    ) {
      updateIncidentDto['closedBy'] = null;
      updateIncidentDto['closedOn'] = new Date();
    }

    // Set undefined to null
    [
      'assignedTo',
      'machine',
      'priority',
      'resolutionTimeInMinutes',
      'proposedSolution',
      'closeNotes',
    ].map((field) => {
      if (updateIncidentDto[field] == undefined)
        updateIncidentDto[field] = null;
    });

    await this.incidentsRepository.update(
      { id },
      { updatedBy: currentUser, ...updateIncidentDto },
    );
    return await this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
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
