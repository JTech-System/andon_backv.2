import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Policy } from './entities/policy.entity';
import { CreatePolicyDto } from './dto/create-policy.dto';

@Injectable()
export class PolicyService {
  constructor(
    @InjectRepository(Policy)
    private policyRepository: Repository<Policy>,
  ) {}
  
  async create(createPolicyDto: CreatePolicyDto): Promise<Policy> {
    const policy = this.policyRepository.create(createPolicyDto);
    return await this.policyRepository.save(policy);
  }

  async findAll(): Promise<Policy[]> {
    return await this.policyRepository.find();
  }

  async findOne(id: string): Promise<Policy> {
    const policy = await this.policyRepository.findOne({where: {id : id}});
    if (!policy) {
      throw new NotFoundException(`Policy with ID ${id} not found`);
    }
    return policy;
  }

  async update(id: string, updatePolicyDto: CreatePolicyDto): Promise<Policy> {
    await this.findOne(id);  // This will throw an error if the policy doesn't exist
    await this.policyRepository.update(id, updatePolicyDto);
    return this.findOne(id);  // Return the updated policy
  }

  async remove(id: string): Promise<void> {
    const policy = await this.findOne(id);  // This will throw an error if the policy doesn't exist
    await this.policyRepository.remove(policy);
  }

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

  evaluatePolicies(policies: Policy[], attributes: Record<string, any>): boolean {
    return policies.every(policy => {
      return this.evaluatePolicy(policy, attributes);
    });
  }

  private evaluatePolicy(policy: Policy, attributes: Record<string, any>): boolean {
    if (!policy.conditions) {
      return true; // if there are no conditions, the policy grants access by default
    }

    return Object.keys(policy.conditions).every(conditionKey => {
      const conditionValue = policy.conditions[conditionKey];
      const attributeValue = attributes[conditionKey];

      //TBD for more fancy logic...
      return attributeValue !== undefined && attributeValue === conditionValue;
    });
  }
}
