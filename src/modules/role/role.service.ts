// src/role/role.service.ts
import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
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
        const existingRole = await this.roleRepository.findOne({ name: createRoleDto.name });
        if (existingRole) {
          throw new ConflictException('Role with this name already exists');
        }
    
        const permissions = await this.permissionRepository.findByIds(createRoleDto.permissions);
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
          throw new InternalServerErrorException('An error occurred while creating the role');
        }
      }
      
    async addPermissionsToRole(roleId: string, permissionIds: number[]): Promise<Role> {
        const role = await this.roleRepository.findOne({ where: { id: roleId }, relations: ['permissions'] });
        const permissions = await this.permissionRepository.findBy({ id: In(permissionIds) });
    
        role.permissions = [...role.permissions, ...permissions];
        
    return this.roleRepository.save(role);
    }

    findAll(): Promise<Role[]> {
        return this.roleRepository.find();
    }

    // Add more methods as needed
}
