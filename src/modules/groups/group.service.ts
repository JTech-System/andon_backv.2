import {
  Injectable,
  ConflictException,
  NotFoundException,
  BadRequestException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateGroupDto } from './dto/create-group.dto';
import { Group } from './entities/group.entity';
import { RoleService } from '../role/role.service';
import { UsersService } from '@users/users.service';
import { GroupAPIListDto } from './dto/group-api.dto';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
    private roleService: RoleService,
    @Inject(forwardRef(() => UsersService)) private usersService: UsersService,
  ) {}

  async create(createGroupDto: CreateGroupDto): Promise<Group> {
    const existingGroup = await this.groupRepository.findOne({
      where: { name: createGroupDto.name },
    });

    if (existingGroup) {
      throw new ConflictException('Group with this name already exists');
    }

    let roles = [];
    if (createGroupDto.roles && createGroupDto.roles.length > 0) {
      roles = await this.roleService.findRolesByIds(createGroupDto.roles);

      if (roles.length !== createGroupDto.roles.length) {
        throw new BadRequestException('One or more roles were not found.');
      }
    }
    let manager;
    if (createGroupDto.manager) {
      try {
        manager = await this.usersService.findOne(createGroupDto.manager);
      } catch (error) {
        console.error('Error while fetching manager:', error);
      }

      if (!manager) {
        createGroupDto.manager = null;
      }
    }
    const group = this.groupRepository.create({
      ...createGroupDto,
      manager,
      roles,
    });

    try {
      return await this.groupRepository.save(group);
    } catch (error) {
      console.log(error);
      throw new ConflictException('Could not save group', error);
    }
  }

  async findAll(): Promise<Group[]> {
    return await this.groupRepository.find();
  }

  async findAllFilters(
    skip = 0,
    take = 10,
    sortField = 'id',
    sortOrder: 'ASC' | 'DESC' = 'ASC',
    search: string
  ): Promise<GroupAPIListDto> {
    
    let whereCondition = {};
  
    if (search) {
      whereCondition = {
        name: Like(`%${search}%`)
      };
    }
  
    const [result, total] = await this.groupRepository.findAndCount({
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

  async findOne(id: string): Promise<Group> {
    const group = await this.groupRepository.findOne({
      where: { id: id },
      relations: ['roles'],
    });

    if (!group) {
      throw new NotFoundException(`Group with ID ${id} not found`);
    }

    return group;
  }

  async update(id: string, updateGroupDto: CreateGroupDto): Promise<Group> {
    const group = await this.findOne(id);

    if (!updateGroupDto.name) {
      throw new BadRequestException('Name is required');
    }

    Object.assign(group, updateGroupDto);
    await this.groupRepository.save(group);
    return group;
  }
  async remove(id: string): Promise<void> {
    const group = await this.findOne(id);
    group.users = [];
    group.roles = [];
    group.manager = null;
    await this.groupRepository.save(group);

    try {
      await this.groupRepository.remove(group);
    } catch (error) {
      throw new ConflictException(
        `Error deleting group with ID ${id}: ${error.message}`,
      );
    }
  }
}
