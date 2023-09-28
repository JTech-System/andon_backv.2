import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateIncidentDto } from './dto/create-incident.dto';
import { UpdateIncidentDto } from './dto/update-incident.dto';
import { Incident } from './entities/incident.entity';
import { User } from '@users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class IncidentsService {
  constructor(
    @InjectRepository(Incident)
    private incidentsRepository: Repository<Incident>,
  ) {}

  async create(
    createIncidentDto: CreateIncidentDto,
    currentUser: User,
  ): Promise<Incident> {
    const incident = await this.incidentsRepository.save({
      number: 'INC0000',
      createdBy: currentUser,
      updatedBy: currentUser,
      ...createIncidentDto,
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
}
