import { Controller, Get, Post, Body } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from '../role/dto/create-role.dto';
import { Role } from '../role/entities/role.entity';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
@ApiTags('Roles')
@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @ApiCreatedResponse({
    type: CreateRoleDto,
  })
  @ApiBearerAuth()
  @ApiConflictResponse({ description: 'Role with this name already exists' })
  @ApiBadRequestResponse({ description: 'Invalid input' })
  async create(
    @Body() createRoleDto: CreateRoleDto,
  ): Promise<Role> {
    return this.roleService.create(createRoleDto);
  }
  
  @Get()
  findAll(): Promise<Role[]> {
    return this.roleService.findAll();
  }
}
