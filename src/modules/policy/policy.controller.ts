import {
  Controller, Get, Post, Put, Delete, Body, Param, UseGuards, ParseUUIDPipe, Query,
} from '@nestjs/common';
import { PolicyService } from './policy.service';
import { CreatePolicyDto } from './dto/create-policy.dto';
import { Policy } from './entities/policy.entity';
import { ApiTags, ApiBearerAuth, ApiOkResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiBadRequestResponse } from '@nestjs/swagger';
import { Roles } from '@utils/decorators/roles.decorator';
import { RolesGuard } from '@utils/guards/roles.guard';
import { JwtAuthGuard } from '@utils/guards/jwt-auth.guard';
import { UserRole } from '@utils/enums/user-role.enum';

@UseGuards(JwtAuthGuard, RolesGuard)
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
  @Get('/policies:userId')
  @Roles(UserRole.ADMIN) // Assuming you want this endpoint to be accessed by admins only
  @ApiOkResponse({ description: 'Returns policies for a given user' })
  @ApiNotFoundResponse({ description: 'User with given ID not found' })
  @ApiBadRequestResponse({ description: 'Invalid request parameters' })
  async getPolicies(
    @Param('userId', new ParseUUIDPipe({ version: '4' })) userId: string, // Added ParseUUIDPipe to validate UUID format
    @Query('resource') resource?: string,
    @Query('action') action?: string,
  ) {
    return await this.policyService.getPolicies(userId, resource, action); // Added await for better error handling
  }
}
