import { Controller, Get, Post, Body } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { Permission } from './entities/permission.entity';

@Controller('permissions')
export class PermissionController {
    constructor(private readonly permissionService: PermissionService) {}

    @Post()
    create(@Body() createPermissionDto: CreatePermissionDto): Promise<Permission> {
        return this.permissionService.create(createPermissionDto);
    }

    @Get()
    findAll(): Promise<Permission[]> {
        return this.permissionService.findAll();
    }
}
