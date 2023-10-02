import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  ParseIntPipe,
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
import { UserRole } from '@utils/enums/user-role.enum'; // Assuming you have an enum for roles
import { JwtAuthGuard } from '@utils/guards/jwt-auth.guard';

@UseGuards(RolesGuard, JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('Roles')
@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @Roles(UserRole.ADMIN) // Use enum instead of hard-coded string
  @ApiCreatedResponse({ type: CreateRoleDto })
  @ApiConflictResponse({ description: 'Role with this name already exists' })
  @ApiBadRequestResponse({ description: 'Invalid input' })
  async create(@Body() createRoleDto: CreateRoleDto): Promise<Role> {
    return this.roleService.create(createRoleDto); // Ensure error handling in the service method
  }

  @Get()
  @Roles(UserRole.ADMIN)
  @ApiOkResponse({ type: [Role] })
  @ApiNotFoundResponse({ description: 'Roles not found' })
  findAll(): Promise<Role[]> {
    return this.roleService.findAll(); // Ensure error handling in the service method
  }

  @Get(':id')
  @Roles(UserRole.ADMIN)
  @ApiOkResponse({ type: Role })
  @ApiNotFoundResponse({ description: 'Role not found' })
  async findOne(@Param('id') id: string): Promise<Role> {
    return this.roleService.findOne(id);
  }
}
