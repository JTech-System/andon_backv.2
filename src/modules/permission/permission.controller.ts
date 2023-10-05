import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { PermissionService } from './permission.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { Permission } from './entities/permission.entity';
import { RolesGuard } from '@utils/guards/roles.guard';
import { Roles } from '@utils/decorators/roles.decorator';
import { UserRole } from '@utils/enums/user-role.enum';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';

@ApiTags('Permission')
@ApiBearerAuth()
@Controller('permissions')
@UseGuards(RolesGuard)
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Post()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Create a Permission' })
  @ApiCreatedResponse({ type: Permission })
  @ApiBadRequestResponse({ description: 'Invalid input' })
  async create(
    @Body() createPermissionDto: CreatePermissionDto,
  ): Promise<Permission> {
    return await this.permissionService.create(createPermissionDto);
  }

  @Get()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Get all Permissions' })
  @ApiOkResponse({ type: [Permission] })
  findAll(): Promise<Permission[]> {
    return this.permissionService.findAll();
  }

  @Get(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Get a Permission by ID' })
  @ApiOkResponse({ type: Permission })
  @ApiNotFoundResponse({ description: 'Permission not found' })
  findOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<Permission> {
    return this.permissionService.findOne(id);
  }

  @Put(':id')
  @Roles(UserRole.ADMIN)
  @ApiOkResponse({ type: Permission })
  @ApiOperation({ summary: 'Update a Permission' })
  @ApiNotFoundResponse({ description: 'Permission not found' })
  @ApiBadRequestResponse({ description: 'Invalid input' })
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updatePermissionDto: CreatePermissionDto,
  ): Promise<Permission> {
    return await this.permissionService.update(id, updatePermissionDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Delete a Permission' })
  @ApiOkResponse({ description: 'Permission deleted successfully' })
  @ApiNotFoundResponse({ description: 'Permission not found' })
  async remove(@Param('id') id: string): Promise<void> {
    await this.permissionService.delete(id);
  }
}
