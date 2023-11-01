import { Injectable, ConflictException, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Like, Repository } from 'typeorm';
import { CreateResourceDto } from './dto/create-resource.dto';
import { Resource } from './entities/resource.entity';
import { ResourceAPIDto } from './dto/resource-api.dto';

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

    try {
        await this.resourceRepository.save(resource);
    } catch (error) {
        throw new InternalServerErrorException(`Error updating the resource: ${error.message}`);
    }

    return resource;
}
async findAllFilters(
  skip = 0,
  take = 10,
  sortField = 'id',
  sortOrder: 'ASC' | 'DESC' = 'ASC',
  search: string,
): Promise<ResourceAPIDto> {
  let whereCondition = {};

  if (search) {
    whereCondition = {
      name: Like(`%${search}%`),
    };
  }

  const [result, total] = await this.resourceRepository.findAndCount({
    where: whereCondition,
    order: { [sortField]: sortOrder },
    skip,
    take,
  });

  if (total === 0) {
    // You can either return an empty result or throw an exception based on your requirements
  }
  return {
    row_count: total,
    rows: result,
  };
}

async remove(id: string): Promise<string> {
    const resource = await this.findOne(id);

    try {
        await this.resourceRepository.remove(resource);
    } catch (error) {
        throw new InternalServerErrorException(`Error deleting the resource: ${error.message}`);
    }

    return `Resource with ID ${id} has been deleted successfully`;
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
