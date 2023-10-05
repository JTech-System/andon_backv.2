import {
  Controller, Get, Post, Put, Delete, Body, Param, UseGuards, ParseUUIDPipe, Query,
} from '@nestjs/common';
import { PolicyService } from './policy.service';
import { CreatePolicyDto } from './dto/create-policy.dto';
import { Policy } from './entities/policy.entity';
import { ApiTags, ApiBearerAuth, ApiOkResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiBadRequestResponse } from '@nestjs/swagger';
import { Roles } from '@utils/decorators/roles.decorator';
import { RolesGuard } from '@utils/guards/roles.guard';
import { UserRole } from '@utils/enums/user-role.enum';

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
  
}
