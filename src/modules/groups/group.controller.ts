import {
  Body,
  Controller,
  Post,
  UseGuards,
  Get,
  Param,
  Put,
  Delete,
  HttpCode,
  NotFoundException
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse, ApiOkResponse } from '@nestjs/swagger';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { Group } from './entities/group.entity'; // Adjust the path according to your project structure
import { RolesGuard } from '@utils/guards/roles.guard';
import { Roles } from '@utils/decorators/roles.decorator';
import { UserRole } from '@utils/enums/user-role.enum'; // Adjust the path according to your project structure
import { AddUserGroupDto } from './dto/add-user-group.dto';

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
  async create(@Body() createGroupDto: CreateGroupDto): Promise<Group> {
    return await this.groupService.create(createGroupDto);
  }
  @Get()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Get all groups' })
  @ApiOkResponse({ type: [Group] })
  findAll(): Promise<Group[]> {
    return this.groupService.findAll();
  }

  @Get(':id')
  @Roles(UserRole.ADMIN) 
  @ApiOperation({ summary: 'Get a group by id' })
  @ApiResponse({ status: 200, description: 'Group fetched successfully.' })
  @ApiResponse({ status: 404, description: 'Group not found.' })
  async findOne(@Param('id') id: string): Promise<Group> {
    const group = await this.groupService.findOne(id);
    if (!group) {
      throw new NotFoundException('Group not found');
    }
    return group;
  }

  @Put(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Update a group' })
  @ApiResponse({ status: 200, description: 'Group updated successfully.' })
  @ApiResponse({ status: 404, description: 'Group not found.' })
  async update(@Param('id') id: string, @Body() updateGroupDto: CreateGroupDto): Promise<Group> {
    return await this.groupService.update(id, updateGroupDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete a group' })
  @ApiResponse({ status: 204, description: 'Group deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Group not found.' })
  async remove(@Param('id') id: string): Promise<void> {
    await this.groupService.remove(id);
  }
}
