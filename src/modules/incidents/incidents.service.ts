import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateIncidentDto } from './dto/create-incident.dto';
import { UpdateIncidentDto } from './dto/update-incident.dto';
import { Incident } from './entities/incident.entity';
import { User } from '@users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IncidentCategory } from './entities/incident-category.entity';
import { CreateIncidentCategoryDto } from './dto/create-incident-category.dto';
import { UpdateIncidentCategoryDto } from './dto/update-incident-category.dto';
import { IncidentStatus } from './enums/incident-status.enum';
import { ProductionLinesService } from '@production-lines/production-lines.service';

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

  // findAll() {
  //   return `This action returns all incidents`;
  // }

  async findOne(id: string): Promise<Incident> {
    const incident = await this.incidentsRepository.findOne({
      where: {
        id,
      },
      relations: {
        createdBy: true,
        updatedBy: true,
        category: true,
        productionLine: true
      }
    });
    if (incident) return incident;
    throw new NotFoundException('Incident not found');
  }

  // update(id: number, updateIncidentDto: UpdateIncidentDto) {
  //   return `This action updates a #${id} incident`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} incident`;
  // }

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
    return await this.incidentCategoriesRepository.find();
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

  async update(
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

  async delete(id: string): Promise<void> {
    await this.findOneCategory(id);
    await this.incidentCategoriesRepository.delete({ id });
  }
}
