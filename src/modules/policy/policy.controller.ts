import {
  Controller, Get, Post, Put, Delete, Body, Param, UseGuards, ParseUUIDPipe, Query,
} from '@nestjs/common';
import { PolicyService } from './policy.service';
import { CreatePolicyDto } from './dto/create-policy.dto';
import { Policy } from './entities/policy.entity';
import { ApiTags, ApiBearerAuth, ApiOkResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiBadRequestResponse, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Roles } from '@utils/decorators/roles.decorator';
import { RolesGuard } from '@utils/guards/roles.guard';
import { UserRole } from '@utils/enums/user-role.enum';
import { PolicyAPIDto } from './dto/resource-api.dto';
import { ResourcePermissionsDto } from '../permission/dto/update-resources.dto';
import { PolicyPermissionsDto } from './dto/policy-permissions.dto copy';
import { PolicyRolesDto } from './dto/policy-roles.dto';

@UseGuards(RolesGuard)
@ApiBearerAuth()
@ApiTags('Policies')
@Controller('policies')
export class PolicyController {
  constructor(private policyService: PolicyService) {}

  @Post()
  @Roles(UserRole.ADMIN)
  @ApiCreatedResponse({ type: Policy, description: 'The policy has been successfully created.'})
  @ApiNotFoundResponse({ description: 'Not found.' })
  create(@Body() createPolicyDto: CreatePolicyDto): Promise<Policy> {
    return this.policyService.create(createPolicyDto);
  }

  @Get()
  @Roles(UserRole.ADMIN)
  @ApiOkResponse({ type: [Policy], description: 'The policies have been successfully retrieved.'})
  findAll(): Promise<Policy[]> {
    return this.policyService.findAll();
  }
  @Get('/filters')
  @Roles(UserRole.ADMIN)
  async findAllFilters(
    @Query('skip') skip: number,
    @Query('take') take: number,
    @Query('sortField') sortField: string,
    @Query('sortOrder') sortOrder: 'ASC' | 'DESC',
    @Query('search') search: string,
  ): Promise<PolicyAPIDto> {
    return await this.policyService.findAllFilters(
      skip,
      take,
      sortField,
      sortOrder,
      search,
    );
  }

  @Get(':id')
  @Roles(UserRole.ADMIN)
  @ApiOkResponse({ type: Policy, description: 'The policy has been successfully retrieved.'})
  @ApiNotFoundResponse({ description: 'Not found.' })
  findOne(@Param('id') id: string): Promise<Policy> {
    return this.policyService.findOne(id);
  }

  @Put(':id')
  @Roles(UserRole.ADMIN)
  @ApiOkResponse({ type: Policy, description: 'The policy has been successfully updated.'})
  @ApiNotFoundResponse({ description: 'Not found.' })
  update(@Param('id') id: string, @Body() updatePolicyDto: CreatePolicyDto): Promise<Policy> {
    return this.policyService.update(id, updatePolicyDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @ApiOkResponse({ description: 'The policy has been successfully deleted.'})
  @ApiNotFoundResponse({ description: 'Not found.' })
  remove(@Param('id') id: string): Promise<void> {
    return this.policyService.remove(id);
  }

  @Get('/by-permission/:permissionId')
  @Roles(UserRole.ADMIN)
  @ApiOkResponse({ type: [Policy], description: 'The policies associated with a specific permission have been successfully retrieved.' })
  @ApiNotFoundResponse({ description: 'Not found.' })
  findPoliciesByPermission(@Param('permissionId') permissionId: string): Promise<Policy[]> {
    return this.policyService.findPoliciesByPermission(permissionId);
  }

  @Put('/roles/:id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Add roles to a policy' })
  @ApiResponse({ status: 200, description: 'policy updated successfully.' })
  @ApiResponse({ status: 404, description: 'policy not found.' })
  addRoles(@Param('id') id: string, @Body() policyRolesDto: PolicyRolesDto) {
    return this.policyService.addRoles(id, policyRolesDto.roles);
  }
  
  @Delete('/roles/:id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Remove roles from a policy' })
  @ApiResponse({ status: 200, description: 'policy updated successfully.' })
  @ApiResponse({ status: 404, description: 'policy not found.' })
  removeRoles(@Param('id') id: string, @Body() policyRolesDto: PolicyRolesDto) {
    return this.policyService.removeRoles(id, policyRolesDto.roles);
  }

  @Put('/permissions/:id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Add permissions to a policy' })
  @ApiResponse({ status: 200, description: 'policy updated successfully.' })
  @ApiResponse({ status: 404, description: 'policy not found.' })
  addPermissions(@Param('id') id: string, @Body() policyPermissionsDto: PolicyPermissionsDto) {
    return this.policyService.addPermissions(id, policyPermissionsDto.permissions);
  }
  
  @Delete('/permissions/:id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Remove permissions from a policy' })
  @ApiResponse({ status: 200, description: 'policy updated successfully.' })
  @ApiResponse({ status: 404, description: 'policy not found.' })
  removePermissions(@Param('id') id: string, @Body() policyPermissionsDto: PolicyPermissionsDto) {
    return this.policyService.removePermissions(id, policyPermissionsDto.permissions);
  }
  
}
