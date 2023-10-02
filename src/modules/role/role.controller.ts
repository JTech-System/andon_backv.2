import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  ParseIntPipe,
  NotFoundException,
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
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from '@utils/decorators/roles.decorator';
import { RolesGuard } from '@utils/guards/roles.guard';
import { UserRole } from '@utils/enums/user-role.enum';
import { JwtAuthGuard } from '@utils/guards/jwt-auth.guard';

@UseGuards(RolesGuard, JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('Roles')
@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @Roles(UserRole.ADMIN)
  @ApiCreatedResponse({ type: Role, description: 'The role has been successfully created.' })
  @ApiConflictResponse({ description: 'Role with this name already exists.' })
  @ApiBadRequestResponse({ description: 'Invalid input.' })
  async create(@Body() createRoleDto: CreateRoleDto): Promise<Role> {
    const role = await this.roleService.create(createRoleDto);
    if (!role) {
      throw new NotFoundException('Role could not be created.');
    }
    return role;
  }

  @Get()
  @Roles(UserRole.ADMIN)
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
  @ApiOkResponse({ type: Role, description: 'Returned role for the given id.' })
  @ApiNotFoundResponse({ description: 'Role with given id not found.' })
  async findOne(@Param('id', ParseIntPipe) id: string): Promise<Role> {
    const role = await this.roleService.findOne(id);
    if (!role) {
      throw new NotFoundException(`Role with id ${id} not found.`);
    }
    return role;
  }
}
