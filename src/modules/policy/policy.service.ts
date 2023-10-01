import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Policy } from './entities/policy.entity';

@Injectable()
export class PolicyService {
  constructor(
    @InjectRepository(Policy)
    private policyRepository: Repository<Policy>,
  ) {}

  async getPolicies(userId: string, resource?: string, action?: string): Promise<Policy[]> {
    let whereClause = { userId };

    if (resource) {
      whereClause['resource'] = resource;
    }

    if (action) {
      whereClause['action'] = action;
    }

    return this.policyRepository.find({ where: whereClause });
  }
}
