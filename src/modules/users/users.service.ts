import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions, In } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Role } from '../role/entities/role.entity';
import { RoleService } from '../role/role.service';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private roleService: RoleService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.findOneBy({
      where: { email: createUserDto.email },
    });
    if (existingUser) {
      throw new BadRequestException(`Account already exists.`);
    }

    let roles = [];
    if (createUserDto.roles && createUserDto.roles.length > 0) {
      if (createUserDto.roles && createUserDto.roles.length > 0) {
        roles = await this.roleService.findRolesByIds(createUserDto.roles);

        console.log('Roles before saving:', roles);
      }

      if (roles.length !== createUserDto.roles.length) {
        throw new BadRequestException('One or more roles were not found.');
      }
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(createUserDto.password, salt);
    console.log('Roles before saving:', roles);

    const user = this.usersRepository.create({
      ...createUserDto,
      passwordHash,
      roles, // Assigning the roles to the user entity
    });

    console.log('Roles before saving:', roles);

    return await this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
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

  async updateUserRoles(userId: string, roles: Role[]): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['roles'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    user.roles = roles;

    try {
      return await this.usersRepository.save(user);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        'An error occurred while updating user roles',
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
}
