import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateGroupDto } from './dto/create-group.dto';
import { Group } from './entities/group.entity';

@Injectable()
export class GroupService {
  
  constructor(
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
  ) {}

  async create(groupDto: CreateGroupDto): Promise<Group> {
    const existingGroup = await this.groupRepository.findOne({ 
      where: { 
        name: groupDto.name,
        table: groupDto.table // Ensure 'table' property exists on DTO and entity
      }
    });

    if (existingGroup) {
      throw new ConflictException('Group with this name and table already exists');
    }

    const group = this.groupRepository.create(groupDto);
    return await this.groupRepository.save(group);
  }

  async findAll(): Promise<Group[]> {
    return await this.groupRepository.find();
  }

  async findOne(id: string): Promise<Group> {
    try {
      return await this.groupRepository.findOneOrFail(id);
    } catch (error) {
      throw new NotFoundException(`Group with ID ${id} not found`);
    }
  }

  async findByType(type: string): Promise<Group[]> {
    const groups = await this.groupRepository.find({ where: { type } });

    if (!groups.length) {
      throw new NotFoundException('No groups found for the provided type');
    }

    return groups;
  }

  async findByValue(name: string): Promise<Group[]> {
    const groups = await this.groupRepository.find({ where: { name } });

    if (!groups.length) {
      throw new NotFoundException('No groups found for the provided name');
    }

    return groups;
  }

  async update(id: string, updateGroupDto: CreateGroupDto): Promise<Group> {
    try {
      const group = await this.groupRepository.preload({ id, ...updateGroupDto });
      return await this.groupRepository.save(group);
    } catch (error) {
      throw new NotFoundException(`Group with ID ${id} not found`);
    }
  }

  async remove(id: string): Promise<void> {
    const group = await this.findOne(id);
    await this.groupRepository.remove(group);
  }

  async findGroupsByIds(groupIds: string[]): Promise<Group[]> {
    const groups = await this.groupRepository.findByIds(groupIds);

    if (groups.length !== groupIds.length) {
      throw new NotFoundException('One or more groups were not found');
    }

    return groups;
  }
}
