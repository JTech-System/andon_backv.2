import { Controller, Get, Query, Param } from '@nestjs/common';
import { PolicyService } from './policy.service';

@Controller('policies')
export class PolicyController {
  constructor(private policyService: PolicyService) {}

  @Get(':userId')
  getPolicies(
    @Param('userId') userId: string,
    @Query('resource') resource?: string,
    @Query('action') action?: string
  ) {
    return this.policyService.getPolicies(userId, resource, action);
  }
}
