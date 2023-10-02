import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from './entities/permission.entity';
import { CreatePermissionDto } from './dto/create-permission.dto';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
  ) {}

  async create(createPermissionDto: CreatePermissionDto): Promise<Permission> {
    const existingPermission = await this.permissionRepository.findOne({
      where: { name: createPermissionDto.name },
    });

    if (existingPermission) {
      throw new ConflictException('Permission with this name already exists');
    }

    const permission = this.permissionRepository.create(createPermissionDto);
    permission.bitmask = this.calculateBitmask(permission);

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
    permission.bitmask = this.calculateBitmask(permission);

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

  private calculateBitmask(permission: Permission): number {
    //bitmask calculation logic.. TBD
    return permission.action.length + permission.resource.length;
  }

  async delete(id: string): Promise<void> {
    const permission = await this.permissionRepository.findOne({where: { id : id },relations: ['roles'] });

    if (!permission) {
      throw new NotFoundException(`Permission with ID ${id} not found`);
    }

    await this.permissionRepository.remove(permission);
  }
}
