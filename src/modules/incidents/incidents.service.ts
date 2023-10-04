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

@Injectable()
export class IncidentsService {
  constructor(
    @InjectRepository(Incident)
    private incidentsRepository: Repository<Incident>,
    @InjectRepository(IncidentCategory)
    private incidentCategoriesRepository: Repository<IncidentCategory>,
    private productionLinesService: ProductionLinesService,
  ) {}

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
      number: 'INC0000',
      createdBy: currentUser,
      updatedBy: currentUser,
      status: IncidentStatus.UNASSIGNED,
      category,
      productionLine,
    });

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
      },
    });
    if (incident) return incident;
    throw new NotFoundException('Incident not found');
  }

  // update(id: number, updateIncidentDto: UpdateIncidentDto) {
  //   return `This action updates a #${id} incident`;
  // }

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
}
