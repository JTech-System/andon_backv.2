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
        table: groupDto.table
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
    const group = await this.groupRepository.findOne({where: {id: id}});

    if (!group) {
      throw new NotFoundException(`Group with ID ${id} not found`);
    }

    return group;
  }

  async findByType(type: string): Promise<Group> {
    const group = await this.groupRepository.findOne({ where: {type: type } });

    if (!group) {
      throw new NotFoundException(`Group not found`);
    }

    return group;
  }
  async findByValue(name: string): Promise<Group> {
    const group = await this.groupRepository.findOne({ where: {name: name} });

    if (!group) {
      throw new NotFoundException(`Group not found`);
    }

    return group;
  }

  async update(id: string, updateGroupDto: CreateGroupDto): Promise<Group> {
    const group = await this.groupRepository.preload({
      id: id, 
      ...updateGroupDto
    });

    if (!group) {
      throw new NotFoundException(`Group with ID ${id} not found`);
    }

    return await this.groupRepository.save(group);
  }

  async remove(id: string): Promise<void> {
    const group = await this.findOne(id); // This will ensure that a NotFoundException is thrown if the group does not exist
    await this.groupRepository.remove(group);
  }

  async findGroupsByIds(groupIds: string[]): Promise<Group[]> {
    const groups = await this.groupRepository.find({ 
      where: { id: In(groupIds) }
    });

    if (!groups || groups.length === 0) {
      throw new NotFoundException('Groups not found');
    }

    return groups;
  }

}
