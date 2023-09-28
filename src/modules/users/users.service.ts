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
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    if (await this.findOneBy({ where: { email: createUserDto.email } }))
      throw new BadRequestException('User email must not exist');
    const salt = await bcrypt.genSalt();
    const user = await this.usersRepository.save({
      passwordHash: await bcrypt.hash(createUserDto.password, salt),
      ...createUserDto,
    });
    return await this.findOne(user.id);
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
}
