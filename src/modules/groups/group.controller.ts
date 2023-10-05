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
  import { GroupService } from './group.service';
  import { CreateGroupDto } from './dto/create-group.dto';
  import { RolesGuard } from '@utils/guards/roles.guard';
  import { Roles } from '@utils/decorators/roles.decorator';
  import { UserRole } from '@utils/enums/user-role.enum'; // Adjust the path according to your project structure
  
  @ApiTags('Groups')
  @Controller('groups')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  export class GroupController {
    constructor(private readonly groupService: GroupService) {}
  
    @Post()
    @Roles(UserRole.ADMIN)
    @ApiOperation({ summary: 'Create a new group' })
    @ApiResponse({ status: 201, description: 'The group has been successfully created.' })
    @ApiResponse({ status: 400, description: 'Invalid input data format.' })
    create(@Body() createGroupDto: CreateGroupDto) {
      return this.groupService.create(createGroupDto);
    }
  
    @Get(':id')
    @Roles(UserRole.ADMIN) 
    @ApiOperation({ summary: 'Get a group by id' })
    @ApiResponse({ status: 200, description: 'Group fetched successfully.' })
    @ApiResponse({ status: 404, description: 'Group not found.' })
    findOne(@Param('id') id: string) {
      return this.groupService.findOne(id);
    }
  
    @Put(':id')
    @Roles(UserRole.ADMIN)
    @ApiOperation({ summary: 'Update a group' })
    @ApiResponse({ status: 200, description: 'Group updated successfully.' })
    @ApiResponse({ status: 404, description: 'Group not found.' })
    update(@Param('id') id: string, @Body() updateGroupDto: CreateGroupDto) {
      return this.groupService.update(id, updateGroupDto);
    }
  
    @Delete(':id')
    @Roles(UserRole.ADMIN)
    @HttpCode(204)
    @ApiOperation({ summary: 'Delete a group' })
    @ApiResponse({ status: 204, description: 'Group deleted successfully.' })
    @ApiResponse({ status: 404, description: 'Group not found.' })
    remove(@Param('id') id: string) {
        return this.groupService.remove(id);
    }
  }
  