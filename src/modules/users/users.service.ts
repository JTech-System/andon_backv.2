import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
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
      throw new BadRequestException(
        `Account already exists.`,
      );
    }

    let roles = [];
    if (createUserDto.roleIds && createUserDto.roleIds.length > 0) {
      let roles = [];
      if (createUserDto.roleIds && createUserDto.roleIds.length > 0) {
        roles = await this.roleService.findRolesByIds(createUserDto.roleIds);
      }

      if (roles.length !== createUserDto.roleIds.length) {
        throw new BadRequestException('One or more roles were not found.');
      }
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(createUserDto.password, salt);

    const user = this.usersRepository.create({
      ...createUserDto,
      passwordHash,
      roles, // Assigning the roles to the user entity
    });

    return await this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: string): Promise<User> {
    const user = this.usersRepository.findOne({
      where: {
        id,
      },
    });
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
}
