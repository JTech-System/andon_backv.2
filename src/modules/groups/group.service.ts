import { Injectable, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGroupDto } from './dto/create-group.dto';
import { Group } from './entities/group.entity';
import { RoleService } from '../role/role.service';
import { UsersService } from '@users/users.service';
import { AddUserGroupDto } from './dto/add-user-group.dto';

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

    Object.assign(group, updateGroupDto);  
    await this.groupRepository.save(group);
    return group;
}

async removeUserFromGroup(updateGroupDto: AddUserGroupDto): Promise<Group> {
  const group = await this.groupRepository.findOne({where: {id:updateGroupDto.group_id}, relations: ['roles'] });
  const user = await this.userService.findOne(updateGroupDto.user_id);

  if (!group || !user) {
      throw new NotFoundException('Group or User not found');
  }

  user.roles = user.roles.filter(role => !group.roles.includes(role));
  await this.userService.updateUserRoles(updateGroupDto.user_id, user.roles);
  return group;
}

async addUserToGroup(updateGroupDto: AddUserGroupDto): Promise<Group> {
  const group = await this.groupRepository.findOne({
      where: {id: updateGroupDto.group_id}, 
      relations: ['roles']
  });
  const user = await this.userService.findOne(updateGroupDto.user_id);

  if (!group || !user) {
      throw new NotFoundException('Group or User not found');
  }

  user.roles = [...new Set([...user.roles, ...group.roles])];  // Ensure uniqueness
  await this.userService.updateUserRoles(updateGroupDto.user_id, user.roles);
  return group;
}

}
