import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateResourceDto } from './dto/create-resource.dto';
import { Resource } from './entities/resource.entity';

@Injectable()
export class ResourceService {
  
  constructor(
    @InjectRepository(Resource)
    private resourceRepository: Repository<Resource>,
  ) {}

  async create(resourceDto: CreateResourceDto): Promise<Resource> {
    const existingResource = await this.resourceRepository.findOne({ 
      where: { 
        name: resourceDto.name,
        table: resourceDto.table
      }
    });

    if (existingResource) {
      throw new ConflictException('Resource with this name and table already exists');
    }

    const resource = this.resourceRepository.create(resourceDto);
    return await this.resourceRepository.save(resource);
  }

  async findAll(): Promise<Resource[]> {
    return await this.resourceRepository.find();
  }

  async findOne(id: string): Promise<Resource> {
    const resource = await this.resourceRepository.findOne({where: {id: id}});

    if (!resource) {
      throw new NotFoundException(`Resource with ID ${id} not found`);
    }

    return resource;
  }

  async findByType(type: string): Promise<Resource> {
    const resource = await this.resourceRepository.findOne({ where: {type: type } });

    if (!resource) {
      throw new NotFoundException(`Resource not found`);
    }

    return resource;
  }
  async findByValue(name: string): Promise<Resource> {
    const resource = await this.resourceRepository.findOne({ where: {name: name} });

    if (!resource) {
      throw new NotFoundException(`Resource not found`);
    }

    return resource;
  }

  async update(id: string, updateResourceDto: CreateResourceDto): Promise<Resource> {
    const resource = await this.resourceRepository.preload({
      id: id, 
      ...updateResourceDto
    });

    if (!resource) {
      throw new NotFoundException(`Resource with ID ${id} not found`);
    }

    return await this.resourceRepository.save(resource);
  }

  async remove(id: string): Promise<void> {
    const resource = await this.findOne(id); // This will ensure that a NotFoundException is thrown if the resource does not exist
    await this.resourceRepository.remove(resource);
  }

  async findResourcesByIds(resourceIds: string[]): Promise<Resource[]> {
    const resources = await this.resourceRepository.find({ 
      where: { id: In(resourceIds) }
    });

    if (!resources || resources.length === 0) {
      throw new NotFoundException('Resources not found');
    }

    return resources;
  }

}
