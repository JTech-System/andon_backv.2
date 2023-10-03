import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
      where: { name: resourceDto.name }
    });

    if (existingResource) {
      throw new ConflictException('Resource with this name already exists');
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

  async update(id: string, updateResourceDto: CreateResourceDto): Promise<Resource> {
    const resource = await this.resourceRepository.preload({
      id: id as any, 
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
}
