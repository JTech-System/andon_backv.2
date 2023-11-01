import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions, In, Like } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Role } from '../role/entities/role.entity';
import { RoleService } from '../role/role.service';

import * as bcrypt from 'bcrypt';
import { UpdateGroupsDto } from './dto/update-groups.dto';
import { GroupsService } from '../groups/group.service';
import { UpdateUserRolesDto } from './dto/update-roles.dto';
import { UserAPIListDto } from './dto/response-api.dto';
import { ResponseUserDto } from './dto/response-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private roleService: RoleService,
    private groupService: GroupsService,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<ResponseUserDto> {
    const existingUser = await this.findOneBy({
      where: { email: createUserDto.email },
    });
    if (existingUser) {
      throw new BadRequestException(`User already exists.`);
    }

    let roles = [];
    if (createUserDto.roles && createUserDto.roles.length > 0) {
      if (createUserDto.roles && createUserDto.roles.length > 0) {
        roles = await this.roleService.findRolesByIds(createUserDto.roles);
      }

      if (roles.length !== createUserDto.roles.length) {
        throw new BadRequestException('One or more roles were not found.');
      }
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(createUserDto.password, salt);
    

    const user = this.usersRepository.create({
      ...createUserDto,
      passwordHash,
      roles,
    });

    // Save the user in the database
    const savedUser = await this.usersRepository.save(user);

    // Create a response object without the password hash
    const responseUser: ResponseUserDto = {
      name: savedUser.name,
      user_id: savedUser.user_id,
      firstName: savedUser.firstName,
      lastName: savedUser.lastName,
      email: savedUser.email,
      phone: savedUser.phone,
      roles: savedUser.roles,
      groups: savedUser.groups,
      id: savedUser.id,
      createdOn: savedUser.createdOn,
      updatedOn: savedUser.updatedOn,
      isActive: savedUser.isActive,
    };

    return responseUser;
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }
  
  async findAllFilters(
    skip = 0,
    take = 10,
    sortField = 'id',
    sortOrder: 'ASC' | 'DESC' = 'ASC',
    search: string
  ): Promise<UserAPIListDto> {
    
    let whereCondition = {};
  
    if (search) {
      whereCondition = {
        name: Like(`%${search}%`)
      };
    }
  
    const [result, total] = await this.usersRepository.findAndCount({
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

  async findOne(id: string, options?: FindOneOptions<User>): Promise<User> {
    const findOptions = {
      ...options,
      where: {
        id,
        ...(options?.where || {}),
      },
    };

    const user = await this.usersRepository.findOne(findOptions);

    if (user) return user;
    throw new NotFoundException('User not found');
  }

  async findOneBy(options: FindOneOptions<User>): Promise<User | null> {
    return await this.usersRepository.findOne(options);
  }
  async findOneByID(id: string): Promise<User | null> {
    return await this.usersRepository.findOne({
      where: { id: id },
      relations: ['roles', 'groups'],
    });
  }
  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }

  async activateUser(id: string): Promise<User> {
    // logic to activate user
    return;
  }

  async deactivateUser(id: string): Promise<User> {
    // logic to deactivate user
    return;
  }

  async findUsersByIds(usersIds: string[]): Promise<User[]> {
    const users = await this.usersRepository.find({
      where: { id: In(usersIds) },
    });

    if (users.length !== usersIds.length) {
      throw new NotFoundException('One or more users were not found.');
    }

    return users;
  }

  async addUserRoles(userId: string, updateUserRolesDto: UpdateUserRolesDto): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['roles', 'groups'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const rolesToAdd = await this.roleService.findRolesByIds(updateUserRolesDto.roles);

    // Add new roles to the user, ensuring uniqueness
    user.roles = [...new Set([...user.roles, ...rolesToAdd])];

    try {
      return await this.usersRepository.save(user);
    } catch (error) {
      throw new InternalServerErrorException(
        'An error occurred while adding roles to the user',
      );
    }
}


async removeUserRoles(userId: string, updateUserRolesDto: UpdateUserRolesDto): Promise<User> {
  const user = await this.usersRepository.findOne({
    where: { id: userId },
    relations: ['roles', 'groups'],
  });

  if (!user) {
    throw new NotFoundException(`User with ID ${userId} not found`);
  }

  const rolesToRemove = await this.roleService.findRolesByIds(updateUserRolesDto.roles);

  // Remove specified roles from the user
  user.roles = user.roles.filter(userRole => !rolesToRemove.some(roleToRemove => roleToRemove.id === userRole.id));
  try {
    return await this.usersRepository.save(user);
  } catch (error) {
    throw new InternalServerErrorException(
      'An error occurred while removing roles from the user',
    );
  }
}
  async getUserRoles(userId: string): Promise<Role[]> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['roles'],
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user.roles;
  }
  async remove(id: string) {
    const user = await this.findOne(id);

    try {
      await this.usersRepository.remove(user);
    } catch (error) {
      throw new InternalServerErrorException(`Error deleting the user: ${error.message}`);
    }

    return `User with ID ${id} has been deleted successfully`;
  }
  async getUserPermissions(userId: string): Promise<Role[]> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['roles'],
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user.roles;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const { roles, ...updateData } = updateUserDto;
    const user = await this.usersRepository.preload({
      id: id,
      ...updateData
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`)

    }
    try {
      return await this.usersRepository.save(user);
    } catch (error) {
      throw new InternalServerErrorException(
        'An error occurred while updating the user',
      );
    }
  }

  async addUserToGroups(userId: string, updateGroupsDto: UpdateGroupsDto): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id: userId }, relations: ['groups'] }); // Use userRepository
    if (!user) {
      throw new NotFoundException('User not found');
    }

    for (const groupId of updateGroupsDto.groups) {
      const group = await this.groupService.findOne(groupId);

      if (!group) {
        continue; // Skip if group not found. Alternatively, you can throw an exception.
      }

      // Add group roles to user
      user.roles = [...new Set([...user.roles, ...group.roles])];

      // Add group to user.groups if it doesn't exist
      if (!user.groups.some(g => g.id === groupId)) {
        user.groups.push(group);
      }
    }

    await this.usersRepository.save(user); // Use userRepository to save user
    return user;
  }

  async removeUserFromGroups(userId: string, updateGroupsDto: UpdateGroupsDto): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id: userId }, relations: ['groups'] }); // Use userRepository
    if (!user) {
      throw new NotFoundException('User not found');
    }

    for (const groupId of updateGroupsDto.groups) {
      const group = await this.groupService.findOne(groupId);

      if (!group) {
        continue; // Skip if group not found. Alternatively, you can throw an exception.
      }

      // Remove group roles from user
      user.roles = user.roles.filter(role => !group.roles.includes(role));

      // Remove group from user.groups
      const index = user.groups.findIndex(g => g.id === groupId);
      if (index !== -1) {
        user.groups.splice(index, 1);
      }
    }

    await this.usersRepository.save(user); // Use userRepository to save user
    return user;
  }


}
