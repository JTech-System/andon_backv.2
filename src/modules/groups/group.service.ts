import { Injectable, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGroupDto } from './dto/create-group.dto';
import { Group } from './entities/group.entity';
import { RoleService } from '../role/role.service';
import { UsersService } from '@users/users.service';

@Injectable()
export class GroupService {
  
  constructor(
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
    private roleService: RoleService, 
    private userService: UsersService,
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

    let users = [];
    if (createGroupDto.users && createGroupDto.users.length > 0) {
      users = await this.userService.findUsersByIds(createGroupDto.users);

      if (users.length !== createGroupDto.users.length) {
        throw new BadRequestException('One or more users were not found.');
      }
    }

    const group = this.groupRepository.create({
      ...createGroupDto,
      roles,
      users,
    });

    try {
      return await this.groupRepository.save(group);
    } catch (error) {
      throw new ConflictException('Could not save group');
    }
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

  async update(id: string, updateGroupDto: CreateGroupDto): Promise<Group> {
    const group = await this.findOne(id);  

    if (!updateGroupDto.name) {
      throw new BadRequestException('Name is required');
    }

    // Updating fields
    group.name = updateGroupDto.name;
    group.description = updateGroupDto.description;
    group.type = updateGroupDto.type;
    group.isActive = updateGroupDto.isActive !== undefined ? updateGroupDto.isActive : group.isActive;
    

    await this.groupRepository.save(group);
    return group;
  }

  async remove(id: string): Promise<void> {
    const group = await this.findOne(id);  

    await this.groupRepository.remove(group);
  }
}
