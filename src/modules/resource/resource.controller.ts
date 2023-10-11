import {
    Body,
    Controller,
    Post,
    UseGuards,
    Get,
    Param,
    Put,
    Delete,
    HttpCode
  } from '@nestjs/common';
  import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
  import { ResourceService } from './resource.service';
  import { CreateResourceDto } from './dto/create-resource.dto';
  import { RolesGuard } from '@utils/guards/roles.guard';
  import { Roles } from '@utils/decorators/roles.decorator';
  import { UserRole } from '@utils/enums/user-role.enum'; // Adjust the path according to your project structure
  
  @ApiTags('Resources')
  @Controller('resources')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  export class ResourceController {
    constructor(private readonly resourceService: ResourceService) {}
  
    @Post()
    @Roles(UserRole.ADMIN)
    @ApiOperation({ summary: 'Create a new resource' })
    @ApiResponse({ status: 201, description: 'The resource has been successfully created.' })
    @ApiResponse({ status: 400, description: 'Invalid input data format.' })
    create(@Body() createResourceDto: CreateResourceDto) {
      return this.resourceService.create(createResourceDto);
    }
  
    @Get()
    @Roles(UserRole.ADMIN) 
    @ApiOperation({ summary: 'Get all resources' })
    @ApiResponse({ status: 200, description: 'Resources fetched successfully.' })
    @ApiResponse({ status: 404, description: 'Resources not found.' })
    findAll() {
      return this.resourceService.findAll();
    }
    @Get(':id')
    @Roles(UserRole.ADMIN) 
    @ApiOperation({ summary: 'Get a resource by id' })
    @ApiResponse({ status: 200, description: 'Resource fetched successfully.' })
    @ApiResponse({ status: 404, description: 'Resource not found.' })
    findOne(@Param('id') id: string) {
      return this.resourceService.findOne(id);
    }
  
    @Put(':id')
    @Roles(UserRole.ADMIN)
    @ApiOperation({ summary: 'Update a resource' })
    @ApiResponse({ status: 200, description: 'Resource updated successfully.' })
    @ApiResponse({ status: 404, description: 'Resource not found.' })
    update(@Param('id') id: string, @Body() updateResourceDto: CreateResourceDto) {
      return this.resourceService.update(id, updateResourceDto);
    }
  
    @Delete(':id')
    @Roles(UserRole.ADMIN)
    @HttpCode(204)
    @ApiOperation({ summary: 'Delete a resource' })
    @ApiResponse({ status: 204, description: 'Resource deleted successfully.' })
    @ApiResponse({ status: 404, description: 'Resource not found.' })
    remove(@Param('id') id: string) {
        return this.resourceService.remove(id);
    }
  }
  