import {
  Controller,
  Get,
  Post,
  UseGuards,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  Put,
  HttpCode,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiBearerAuth,
  ApiOperation,
  ApiOkResponse,
  ApiResponse,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RolesGuard } from '@utils/guards/roles.guard';
import { User } from './entities/user.entity';
import { ResponseUserDto } from './dto/response-user.dto';
import { CurrentUser } from '@auth/auth.decorator';
import { UserRole } from '@utils/enums/user-role.enum';
import { Roles } from '@utils/decorators/roles.decorator';
import { FindOneOptions } from 'typeorm';
import { UpdateGroupsDto } from './dto/update-groups.dto';
import { UpdateUserRolesDto } from './dto/update-roles.dto';
import { UserAPIListDto } from './dto/response-api.dto';
import { IsOptional } from 'class-validator';
@UseGuards(RolesGuard)
@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  //@Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Create a User' })
  @ApiCreatedResponse({
    type: ResponseUserDto,
    description: 'The user has been successfully created.',
  })
  @ApiConflictResponse({ description: 'User with this name already exists.' })
  @ApiBadRequestResponse({ description: 'Invalid input.' })
  async create(@Body() createUserDto: CreateUserDto): Promise<ResponseUserDto> {
    const user = await this.usersService.create(createUserDto);
    if (!user) {
      throw new NotFoundException('User could not be created.');
    }
    return user;
  }

  @Get()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Get all Users' })
  @ApiOkResponse({ type: [User], description: 'Returned all users.' })
  async findAll(): Promise<User[]> {
    const users = await this.usersService.findAllFilters(
      0,
      5,
      'id',
      'DESC',
      '',
    );
    if (users.row_count === 0) {
      throw new NotFoundException('No users found.');
    }
    return users.rows;
  }

  @Get('/filters')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Filter Users' })
  @ApiOkResponse({ type: [User], description: 'Returning users filtered.' })
  async findAllQuery(
    @Query('skip') skip: number,
    @Query('take') take: number,
    @Query('sortField') sortField: string,
    @Query('sortOrder') sortOrder: 'ASC' | 'DESC',
    @Query('search') search: string | null,
  ): Promise<UserAPIListDto> {
    const users = await this.usersService.findAllFilters(
      skip,
      take,
      sortField,
      sortOrder,
      search,
    );
    if (users.row_count === 0) {
      throw new NotFoundException('No users found.');
    }
    return users;
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Query() options: FindOneOptions<User>,
  ): Promise<User> {
    return this.usersService.findOneByID(id);
  }

  @Get('/roles')
  @Roles(UserRole.ADMIN)
  async getUserRoles(@CurrentUser() currentUser: User) {
    try {
      const roles = await this.usersService.getUserRoles(currentUser.id);
      return roles;
    } catch (error) {
      throw new NotFoundException(`User with ID ${currentUser.id} not found`);
    }
  }

  @Put(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Update a User' })
  @ApiResponse({ status: 200, description: 'User updated successfully.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateUserDto) {
    return this.usersService.update(id, updateRoleDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete a User' })
  @ApiResponse({ status: 204, description: 'User deleted successfully.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @Put('/groups/:id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Add user to a Group' })
  @ApiResponse({
    status: 200,
    description: 'User groups updated successfully.',
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async addUserToGroup(
    @Param('id') id: string,
    @Body() updateGroupDto: UpdateGroupsDto,
  ): Promise<User> {
    return await this.usersService.addUserToGroups(id, updateGroupDto);
  }

  @Delete('/groups/:id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Remove user from a group' })
  @ApiResponse({ status: 200, description: 'User updated successfully.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async removeUserFromGroup(
    @Param('id') id: string,
    @Body() updateGroupDto: UpdateGroupsDto,
  ): Promise<User> {
    return await this.usersService.removeUserFromGroups(id, updateGroupDto);
  }

  @Put('/roles/:id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Add Roles to a user' })
  @ApiResponse({ status: 200, description: 'User roles updated successfully.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async addRolesToUSer(
    @Param('id') id: string,
    @Body() updaterolesDto: UpdateUserRolesDto,
  ): Promise<User> {
    return await this.usersService.addUserRoles(id, updaterolesDto);
  }

  @Delete('/roles/:id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Remove roles from user' })
  @ApiResponse({ status: 200, description: 'User roles updated successfully.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async removeRolesFromUser(
    @Param('id') id: string,
    @Body() updaterolesDto: UpdateUserRolesDto,
  ): Promise<User> {
    return await this.usersService.removeUserRoles(id, updaterolesDto);
  }
}
