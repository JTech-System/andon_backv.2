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
  import { UserRole } from '@utils/enums/user-role.enum'; // Assuming you have an enum for roles
  import { ApiTags, ApiBearerAuth, ApiOkResponse, ApiNotFoundResponse, ApiBadRequestResponse, ApiCreatedResponse } from '@nestjs/swagger';
  
  @ApiTags('Permission')
  @ApiBearerAuth()
  @Controller('permissions')
  @UseGuards(RolesGuard)
  export class PermissionController {
      constructor(private readonly permissionService: PermissionService) {}
  
      @Post()
      @Roles(UserRole.ADMIN) 
      @ApiCreatedResponse({ type: Permission })
      @ApiBadRequestResponse({ description: 'Invalid input' })
      async create(@Body() createPermissionDto: CreatePermissionDto): Promise<Permission> {
          return await this.permissionService.create(createPermissionDto);
      }
  
      @Get()
      @Roles(UserRole.ADMIN)
      @ApiOkResponse({ type: [Permission] })
      findAll(): Promise<Permission[]> {
          return this.permissionService.findAll();
      }
  
      @Get(':id')
      @Roles(UserRole.ADMIN)
      @ApiOkResponse({ type: Permission })
      @ApiNotFoundResponse({ description: 'Permission not found' })
      findOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<Permission> {
          return this.permissionService.findOne(id);
      }
  
      @Put(':id')
      @Roles(UserRole.ADMIN)
      @ApiOkResponse({ type: Permission })
      @ApiNotFoundResponse({ description: 'Permission not found' })
      @ApiBadRequestResponse({ description: 'Invalid input' })
      async update(
          @Param('id', new ParseUUIDPipe()) id: string,
          @Body() updatePermissionDto: CreatePermissionDto
      ): Promise<Permission> {
          return await this.permissionService.update(id, updatePermissionDto);
      }
  
      @Delete(':id')
      @Roles(UserRole.ADMIN)
      @ApiOkResponse({ description: 'Permission deleted successfully' })
      @ApiNotFoundResponse({ description: 'Permission not found' })
      async delete(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
          await this.permissionService.delete(id);
      }
  }
  