import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Policy } from './entities/policy.entity';
import { CreatePolicyDto } from './dto/create-policy.dto';
import { Role } from '../role/entities/role.entity';
import { RoleService } from '../role/role.service';
import { PermissionService } from '../permission/permission.service';

@Injectable()
export class PolicyService {
  constructor(
    @InjectRepository(Policy)
    private policyRepository: Repository<Policy>,
    private roleService: RoleService,
    private permissionService: PermissionService,

  ) {}
  
  async create(createPolicyDto: CreatePolicyDto): Promise<Policy> {
    const existingPolicy = await this.policyRepository.findOne({where: {name: createPolicyDto.name}});
    if (existingPolicy) {
      throw new ConflictException('A policy with this name already exists');
    }

    const policy = this.policyRepository.create(createPolicyDto);

    return await this.policyRepository.save(policy);
  }
  
  async findAll(): Promise<Policy[]> {
    return await this.policyRepository.find({ relations: ['roles', 'permissions'] });
  }

  async update(id: string, updatePolicyDto: CreatePolicyDto): Promise<Policy> {
    const policy = await this.findOne(id);  
    if (!policy) {
      throw new NotFoundException(`Policy with ID ${id} not found`);
    }
    Object.assign(policy, updatePolicyDto); // Merge the updates into the found policy entity
    await this.policyRepository.save(policy);  // Save the updated policy entity

    return policy;  
  }

  async remove(id: string): Promise<void> {
    const policy = await this.findOne(id);  
    if (!policy) {
      throw new NotFoundException(`Policy with ID ${id} not found`);
    }

    await this.policyRepository.remove(policy);
  }

  async findPoliciesByPermission(permissionId: string): Promise<Policy[]> {
    const policies = await this.policyRepository
      .createQueryBuilder('policy')
      .innerJoin('policy.permissions', 'permission')
      .where('permission.id = :permissionId', { permissionId })
      .getMany();

    if (!policies.length) {
      throw new NotFoundException(`No policies found for permission ID ${permissionId}`);
    }

    return policies;
  }

  evaluatePolicies(policies: Policy[], attributes: Record<string, any>): boolean {
    return policies.every(policy => this.evaluatePolicy(policy, attributes));
  }


  async findOne(id: string): Promise<Policy> {
    const policy = await this.policyRepository.findOne({where: {id:id}, relations: ['roles', 'permissions'] });
    if (!policy) {
        throw new NotFoundException(`Policy with ID ${id} not found`);
    }
    return policy;
}

private evaluatePolicy(policy: Policy, attributes: Record<string, any>): boolean {
    if (!policy.conditions) {
        return true;
    }

    return Object.keys(policy.conditions).every(conditionKey => {
        const conditionValue = policy.conditions[conditionKey];
        const attributeValue = attributes[conditionKey];

        // Add more complex evaluation logic as needed, e.g., regex, numerical comparisons, etc.
        return attributeValue !== undefined && attributeValue === conditionValue;
    });
}



}
