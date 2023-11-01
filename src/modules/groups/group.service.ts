import {
  Injectable,
  ConflictException,
  NotFoundException,
  BadRequestException,
  Inject,
  forwardRef,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateGroupDto } from './dto/create-group.dto';
import { Group } from './entities/group.entity';
import { RoleService } from '../role/role.service';
import { UsersService } from '@users/users.service';
import { GroupAPIListDto } from './dto/group-api.dto';
import { GroupRolesDto } from './dto/add-roles-group.dto';

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
    let manager;
    if (createGroupDto.manager) {
      try {
        manager = await this.usersService.findOne(createGroupDto.manager);
      } catch (error) {
      }

      if (!manager) {
        createGroupDto.manager = null;
      }
    }
    const group = this.groupRepository.create({
      ...createGroupDto,
      manager,      
    });

    try {
      return await this.groupRepository.save(group);
    } catch (error) {
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
    search: string,
  ): Promise<GroupAPIListDto> {
    let whereCondition = {};

    if (search) {
      whereCondition = {
        name: Like(`%${search}%`),
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
      relations: ['roles', 'users'],
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

    let manager;
    if (updateGroupDto.manager) {
      try {
        manager = await this.usersService.findOne(updateGroupDto.manager);
      } catch (error) {
      }      
    }
    if (!manager) {
      let managerId = null;
      Object.assign(group, {
        ...updateGroupDto,
        manager,  
        managerId   
      });
    }else{
      Object.assign(group, {
        ...updateGroupDto,
        manager,      
      });
    }
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

  async addGroupRoles(
    groupId: string,
    updateGroupRolesDto: GroupRolesDto,
  ): Promise<Group> {
    const group = await this.groupRepository.findOne({
      where: { id: groupId },
      relations: ['roles', 'users'], // Include 'users' relation if it's not already included
    });

    if (!group) {
      throw new NotFoundException(`Group with ID ${groupId} not found`);
    }

    const rolesToAdd = await this.roleService.findRolesByIds(
      updateGroupRolesDto.roles,
    );

    // Add new roles to the group, ensuring uniqueness
    group.roles = [...new Set([...group.roles, ...rolesToAdd])];

    // Update the roles for all users in the group
    for (const user of group.users) {
      user.roles = [...new Set([...user.roles, ...rolesToAdd])];
      await this.usersService.addUserRoles(user.id,  {roles: updateGroupRolesDto.roles}); // Update user roles
    }

    try {
      return await this.groupRepository.save(group);
    } catch (error) {
      throw new InternalServerErrorException(
        'An error occurred while adding roles to the group',
      );
    }
  }

  async removeGroupRoles(
    groupId: string,
    updateGroupRolesDto: GroupRolesDto,
  ): Promise<Group> {
    const group = await this.groupRepository.findOne({
      where: { id: groupId },
      relations: ['roles', 'users'], // Include 'users' relation if it's not already included
    });

    if (!group) {
      throw new NotFoundException(`Group with ID ${groupId} not found`);
    }

    const rolesToRemove = await this.roleService.findRolesByIds(
      updateGroupRolesDto.roles,
    );

    // Remove specified roles from the group and all users in the group
    group.roles = group.roles.filter(
      (groupRole) =>
        !rolesToRemove.some((roleToRemove) => roleToRemove.id === groupRole.id),
    );

    for (const user of group.users) {
      this.usersService.removeUserRoles(user.id, {roles:  updateGroupRolesDto.roles})
    }

    try {
      return await this.groupRepository.save(group);
    } catch (error) {
      throw new InternalServerErrorException(
        'An error occurred while removing roles from the group',
      );
    }
  }
}
