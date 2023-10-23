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
} from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBadRequestResponse, ApiConflictResponse, ApiBearerAuth, ApiOperation, ApiOkResponse, ApiResponse } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {RolesGuard} from '@utils/guards/roles.guard'
import { User } from './entities/user.entity';
import { ResponseUserDto } from './dto/response-user.dto';
import { CurrentUser } from '@auth/auth.decorator';
import { UserRole } from '@utils/enums/user-role.enum';
import { Roles } from '@utils/decorators/roles.decorator';
@UseGuards(RolesGuard)
@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Roles(UserRole.ADMIN)
  @ApiOperation({summary: 'Create a User'})
  @ApiCreatedResponse({
    type: ResponseUserDto,
    description:'The user has been successfully created.'
  })
  @ApiConflictResponse({ description: 'User with this name already exists.' })
  @ApiBadRequestResponse({ description: 'Invalid input.' })
  async create(@Body() createUserDto: CreateUserDto): Promise<ResponseUserDto> {
    const user = await this.usersService.create(createUserDto);
    if(!user){
      throw new NotFoundException('User could not be created.')
    }
    return user;
  }

  @Get()
  @Roles(UserRole.ADMIN)
  @ApiOperation({summary: 'Get all Users'})
  @ApiOkResponse({type:[User],description:'Returned all users.'})
  async findAll(): Promise <User []> {
    const users = await this.usersService.findAll();
    if(users.length ===0){
      throw new NotFoundException ('No roles found.');
    }
    return users;
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
}
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.usersService.findOne(id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }

