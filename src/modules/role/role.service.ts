import {
  ConflictException,
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, Like } from 'typeorm';
import { Role } from './entities/role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { PermissionService } from '../permission/permission.service';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RolesResponseDto } from './dto/roles-list.dto';
import { AddRolePermissionsDto } from './dto/add-role-permissions.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    private permissionService: PermissionService, 


  ) {}

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    return await this.roleRepository.manager.transaction(async (manager) => {
      const existingRole = await this.roleRepository.findOne({
        where: { name: createRoleDto.name },
      });
      if (existingRole) {
        throw new ConflictException('Role with this name already exists');
      }

      const permissions = await this.permissionService.findPermissionsByIds(createRoleDto.permissions);

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

  async update(id: string, updateRoleDto: UpdateRoleDto): Promise<Role> {
    const role = await this.roleRepository.findOne({where: { id: id}, relations: ['permissions'] });
    if (!role) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }

    if (updateRoleDto.name) {
      const existingRole = await this.roleRepository.findOne({
        where: { name: updateRoleDto.name },
      });
      if (existingRole && existingRole.id !== id) {
        throw new ConflictException('Role with this name already exists');
      }
      role.name = updateRoleDto.name;
    }

    if (updateRoleDto.permissions && updateRoleDto.permissions.length > 0) {
      const permissions = await this.permissionService.findPermissionsByIds(updateRoleDto.permissions);
      if (permissions.length !== updateRoleDto.permissions.length) {
        const foundPermissionIds = permissions.map((p) => p.id);
        const notFoundPermissions = updateRoleDto.permissions.filter(
          (id) => !foundPermissionIds.includes(id),
        );
        throw new BadRequestException(
          `Permissions with IDs ${notFoundPermissions.join(', ')} not found`,
        );
      }
      role.permissions = permissions;
    }

    try {
      return await this.roleRepository.save(role);
    } catch (error) {
      throw new InternalServerErrorException(
        'An error occurred while updating the role',
      );
    }
  }

  async addRolePermissions(id: string, addRolePermissionsDto: AddRolePermissionsDto): Promise<Role> {
    const role = await this.roleRepository.findOne({ where: { id: id }, relations: ['permissions'] });
    if (!role) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }

    if (addRolePermissionsDto.permissions && addRolePermissionsDto.permissions.length > 0) {
      const existingPermissionIds = role.permissions.map(permission => permission.id);
      
      // Filter out permissions that are already associated with the role
      const newPermissionIds = addRolePermissionsDto.permissions.filter(
        id => !existingPermissionIds.includes(id),
      );

      if (newPermissionIds.length > 0) {
        const newPermissions = await this.permissionService.findPermissionsByIds(newPermissionIds);
        if (newPermissions.length !== newPermissionIds.length) {
          const foundPermissionIds = newPermissions.map(p => p.id);
          const notFoundPermissions = newPermissionIds.filter(id => !foundPermissionIds.includes(id));
          throw new BadRequestException(
            `Permissions with IDs ${notFoundPermissions.join(', ')} not found`,
          );
        }

        // Add new permissions to the existing ones
        role.permissions = [...role.permissions, ...newPermissions];
      }
    }

    try {
      return await this.roleRepository.save(role);
    } catch (error) {
      throw new InternalServerErrorException(
        'An error occurred while adding permissions to the role',
      );
    }
}


  async addPermission(roleId: string, permissionId: string): Promise<Role> {
    const role = await this.roleRepository.findOne({
      where: { id: roleId },
      relations: ['permissions'],
    });
    const permission = await this.permissionService.findOne(permissionId);

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

  async findAllFilters(
    skip = 0,
    take = 10,
    sortField = 'id',
    sortOrder: 'ASC' | 'DESC' = 'ASC',
    search: string
  ): Promise<RolesResponseDto> {
    
    let whereCondition = {};
  
    if (search) {
      whereCondition = {
        name: Like(`%${search}%`)
      };
    }
  
    const [result, total] = await this.roleRepository.findAndCount({
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

  async remove(id: string): Promise<string> {
    const role = await this.findOne(id);

    try {
        await this.roleRepository.remove(role);
    } catch (error) {
        throw new InternalServerErrorException(`Error deleting the role: ${error.message}`);
    }

    return `Role with ID ${id} has been deleted successfully`;
}
}


