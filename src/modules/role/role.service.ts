import {
  ConflictException,
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Role } from './entities/role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { Permission } from '../permission/entities/permission.entity';
import { UsersService } from '@users/users.service';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
    private userService: UsersService,

  ) {}

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    return await this.roleRepository.manager.transaction(async (manager) => {
      const existingRole = await this.roleRepository.findOne({
        where: { name: createRoleDto.name },
      });
      if (existingRole) {
        throw new ConflictException('Role with this name already exists');
      }

      const permissions = await this.permissionRepository.find({
        where: { id: In(createRoleDto.permissions) },
      });

      if (permissions.length !== createRoleDto.permissions.length) {
        const foundPermissionIds = permissions.map((p) => p.id);
        const notFoundPermissions = createRoleDto.permissions.filter(
          (id) => !foundPermissionIds.includes(id),
        );
        throw new NotFoundException(
          `Permissions with IDs ${notFoundPermissions.join(', ')} not found`,
        );
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

  async addPermission(roleId: string, permissionId: string): Promise<Role> {
    const role = await this.roleRepository.findOne({
      where: { id: roleId },
      relations: ['permissions'],
    });
    const permission = await this.permissionRepository.findOne({
      where: { id: permissionId },
    });

    if (role && permission) {
      role.permissions.push(permission);
      return this.roleRepository.save(role);
    }

    throw new NotFoundException('Role or Permission not found');
  }

  async removePermission(roleId: string, permissionId: string): Promise<Role> {
    const role = await this.roleRepository.findOne({
      where: { id: roleId },
      relations: ['permissions'],
    });

    if (role) {
      role.permissions = role.permissions.filter((p) => p.id !== permissionId);
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

  async findRolesByIds(roleIds: string[]): Promise<Role[]> {
    const roles = await this.roleRepository.find({
      where: roleIds.map((roleId) => ({ id: roleId })),
    });

    if (roles.length !== roleIds.length) {
      throw new NotFoundException('One or more roles were not found.');
    }

    return roles;
  }

  async findRolesByUserId(userId: string): Promise<Role[]> {
    const user = await this.userService.findOne(userId);  // Use UserService to get the user

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    if (!user.roles || user.roles.length === 0) {
      throw new NotFoundException(`No roles found for user with ID ${userId}`);
    }

    return user.roles;
  }
  

}


