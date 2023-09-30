// src/permission/permission.service.ts
import { Injectable } from '@nestjs/common';
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

    create(createPermissionDto: CreatePermissionDto): Promise<Permission> {
        const permission = this.permissionRepository.create(createPermissionDto);
        return this.permissionRepository.save(permission);
    }

    findAll(): Promise<Permission[]> {
        return this.permissionRepository.find();
    }

    // Add more methods as needed
}
