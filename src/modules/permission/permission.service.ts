import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Permission } from './entities/permission.entity';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { ResourceService } from '../resource/resource.service';

@Injectable()
export class PermissionService {
  
  constructor(
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
    private resourceService: ResourceService,
  ) {}

  async create(createPermissionDto: CreatePermissionDto): Promise<Permission> {
    const existingPermission = await this.permissionRepository.findOne({
      where: { name: createPermissionDto.name },
    });

    if (existingPermission) {
      throw new ConflictException('Permission with this name already exists');
    }

    let resources = [];
    if (createPermissionDto.resources && createPermissionDto.resources.length > 0) {
      resources = await this.resourceService.findResourcesByIds(createPermissionDto.resources);

      if (resources.length !== createPermissionDto.resources.length) {
        throw new BadRequestException('One or more resources were not found.');
      }
    }

    const permission = this.permissionRepository.create({
      ...createPermissionDto,
      resources,
    });

    try {
      return await this.permissionRepository.save(permission);
      
    } catch (error) {
      throw new ConflictException('Could not save permission');
    }
  }

  async findOne(id: string): Promise<Permission> {
    const permission = await this.permissionRepository.findOne({ where: { id: id } });
    if (!permission) {
      throw new NotFoundException(`Permission with given ID not found`);
    }
    return permission;
  }
  

  async findAll(): Promise<Permission[]> {
    return await this.permissionRepository.find();
  }

  async update(id: string, updatePermissionDto: CreatePermissionDto): Promise<Permission> {
    const permission = await this.findOne(id);
    Object.assign(permission, updatePermissionDto);

    try {
      return await this.permissionRepository.save(permission);
    } catch (error) {
      throw new ConflictException('Could not update permission');
    }
  }

  async remove(id: string): Promise<void> {
    const permission = await this.findOne(id);
    try {
      await this.permissionRepository.remove(permission);
    } catch (error) {
      throw new ConflictException('Could not delete permission');
    }
  }

  async findPermissionsByIds(permissionIds: string[]): Promise<Permission[]> {
    const permissions = await this.permissionRepository.find({ where: { id: In(permissionIds) } });

    if (permissions.length !== permissionIds.length) {
      throw new NotFoundException('One or more permissions were not found.');
    }

    return permissions;
  }
  

  async delete(id: string): Promise<void> {
    const permission = await this.permissionRepository.findOne({where: { id : id },relations: ['roles'] });

    if (!permission) {
      throw new NotFoundException(`Permission with ID ${id} not found`);
    }

    await this.permissionRepository.remove(permission);
  }
}
