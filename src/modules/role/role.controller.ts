import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  ParseIntPipe,
  NotFoundException,
  Put,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from '../role/dto/create-role.dto';
import { Role } from '../role/entities/role.entity';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from '@utils/decorators/roles.decorator';
import { RolesGuard } from '@utils/guards/roles.guard';
import { UserRole } from '@utils/enums/user-role.enum';
import { UpdateRoleDto } from './dto/update-role.dto';

@UseGuards(RolesGuard)
@ApiBearerAuth()
@ApiTags('Roles')
@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Create a Role' })
  @ApiCreatedResponse({
    type: Role,
    description: 'The role has been successfully created.',
  })
  @ApiConflictResponse({ description: 'Role with this name already exists.' })
  @ApiBadRequestResponse({ description: 'Invalid input.' })
  async create(@Body() createRoleDto: CreateRoleDto): Promise<Role> {
    const role = await this.roleService.create(createRoleDto);
    if (!role) {
      throw new NotFoundException('Role could not be created.');
    }
    return role;
  }

  @Put(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Update a Role' })
  @ApiResponse({ status: 200, description: 'Role updated successfully.' })
  @ApiResponse({ status: 404, description: 'Role not found.' })
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(id, updateRoleDto);
  }

  @Get()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Get all Roles' })
  @ApiOkResponse({ type: [Role], description: 'Returned all roles.' })
  async findAll(): Promise<Role[]> {
    const roles = await this.roleService.findAll();
    if (roles.length === 0) {
      throw new NotFoundException('No roles found.');
    }
    return roles;
  }

  @Get(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Get a Role by ID' })
  @ApiOkResponse({ type: Role, description: 'Returned role for the given id.' })
  @ApiNotFoundResponse({ description: 'Role with given id not found.' })
  async findOne(@Param('id', ParseIntPipe) id: string): Promise<Role> {
    const role = await this.roleService.findOne(id);
    if (!role) {
      throw new NotFoundException(`Role with id ${id} not found.`);
    }
    return role;
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete a Role' })
  @ApiResponse({ status: 204, description: 'Role deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Role not found.' })
  remove(@Param('id') id: string) {
    return this.roleService.remove(id);
  }
}
