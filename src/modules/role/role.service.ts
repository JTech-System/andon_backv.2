// src/role/role.service.ts
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Role } from '../role/entities/role.entity';
import { CreateRoleDto } from '../role/dto/create-role.dto';
import { Permission } from '../permission/entities/permission.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
  ) {}

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    return await this.roleRepository.manager.transaction(async manager => {
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
      const foundPermissionIds = permissions.map(p => p.id);
      const notFoundPermissions = createRoleDto.permissions.filter(id => !foundPermissionIds.includes(id));
      throw new NotFoundException(`Permissions with IDs ${notFoundPermissions.join(', ')} not found`);
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
  });
  }

  async addPermissionsToRole(
    roleId: string,
    permissionIds: number[],
  ): Promise<Role> {
    const role = await this.roleRepository.findOne({
      where: { id: roleId },
      relations: ['permissions'],
    });
    const permissions = await this.permissionRepository.findBy({
      id: In(permissionIds),
    });

    role.permissions = [...role.permissions, ...permissions];

    return this.roleRepository.save(role);
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
