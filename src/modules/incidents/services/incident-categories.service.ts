import { CreateIncidentCategoryDto } from '@incidents/dto/create-incident-category.dto';
import { UpdateIncidentCategoryDto } from '@incidents/dto/update-incident-category.dto';
import { IncidentCategory } from '@incidents/entities/incident-category.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class IncidentCategoriesService {
  constructor(
    @InjectRepository(IncidentCategory)
    private incidentCategoriesRepository: Repository<IncidentCategory>,
  ) {}

  async create(
    createIncidentCategoryDto: CreateIncidentCategoryDto,
  ): Promise<IncidentCategory> {
    const incidentCategory = await this.incidentCategoriesRepository.save(
      createIncidentCategoryDto,
    );
    return await this.findOne(incidentCategory.id);
  }

  async findAll(): Promise<IncidentCategory[]> {
    return await this.incidentCategoriesRepository.find({
      where: {
        active: true,
      },
      order: {
        value: 'ASC',
      },
    });
  }

  async findOne(id: string): Promise<IncidentCategory> {
    const incidentCategory = await this.incidentCategoriesRepository.findOne({
      where: {
        id,
        active: true,
      },
    });
    if (incidentCategory) return incidentCategory;
    throw new NotFoundException('Incident category not found');
  }

  async update(
    id: string,
    updateIncidentCategoryDto: UpdateIncidentCategoryDto,
  ): Promise<IncidentCategory> {
    await this.findOne(id);
    await this.incidentCategoriesRepository.update(
      { id },
      updateIncidentCategoryDto,
    );
    return await this.findOne(id);
  }

  async delete(id: string): Promise<void> {
    await this.findOne(id);
    await this.incidentCategoriesRepository.update({ id }, { active: false });
  }
}
