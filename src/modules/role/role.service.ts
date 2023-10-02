// src/role/role.service.ts
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  Inject
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Role } from '../role/entities/role.entity';
import { CreateRoleDto } from '../role/dto/create-role.dto';
import { Permission } from '../permission/entities/permission.entity';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class RoleService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
  ) {}

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const existingRole = await this.roleRepository.findOne({
      where: { name: createRoleDto.name },
    });
    if (existingRole) {
      throw new ConflictException('Role with this name already exists');
    }

    const permissions = await this.permissionRepository.findBy({
      id: In(createRoleDto.permissions),
    });
    if (permissions.length !== createRoleDto.permissions.length) {
      throw new NotFoundException('One or more permissions not found');
    }

    const role = this.roleRepository.create({
      name: createRoleDto.name,
      permissions: permissions,
    });

    try {
      return await this.roleRepository.save(role);
    } catch (error) {
      throw new InternalServerErrorException(
        'An error occurred while creating the role',
      );
    }
  }

  async addPermission(roleId: string, permissionId: string): Promise<Role> {
    const role = await this.roleRepository.findOne({where: { id: roleId }, relations: ['permissions'] });
    const permission = await this.permissionRepository.findOne({where: { id: permissionId }});

    if (role && permission) {
      role.permissions.push(permission);
      return this.roleRepository.save(role);
    }

    throw new NotFoundException('Role or Permission not found');
  }

  async removePermission(roleId: string, permissionId: string): Promise<Role> {
    const role = await this.roleRepository.findOne({where: { id: roleId }, relations: ['permissions'] });

    if (role) {
      role.permissions = role.permissions.filter(p => p.id !== permissionId);
      return this.roleRepository.save(role);
    }

    throw new NotFoundException('Role not found');
  }

  findAll(): Promise<Role[]> {
    return this.roleRepository.find();
  }

  async findOne(id: string): Promise<Role> {
    const role = await this.roleRepository.findOne({
      where: { id: id },
      relations: ['permissions'],
    });
    if (!role) {
        throw new NotFoundException(`Role with ID ${id} not found`);
    }
    return role;
}
}
