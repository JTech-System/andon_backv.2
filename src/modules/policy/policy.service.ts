import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
  All,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Any,
  Between,
  Brackets,
  Equal,
  FindOptionsWhere,
  In,
  IsNull,
  LessThan,
  LessThanOrEqual,
  Like,
  MoreThan,
  MoreThanOrEqual,
  Not,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';
import { Policy, PolicyAction } from './entities/policy.entity';
import { CreatePolicyDto } from './dto/create-policy.dto';
import { Role } from '../role/entities/role.entity';
import { RoleService } from '../role/role.service';
import { PermissionService } from '../permission/permission.service';
import { User } from '@users/entities/user.entity';
import { PolicyAPIDto } from './dto/resource-api.dto';
import { ResourceService } from '../resource/resource.service';

@Injectable()
export class PolicyService {
  constructor(
    @InjectRepository(Policy)
    private policyRepository: Repository<Policy>,
    private roleService: RoleService,
    private permissionService: PermissionService,
    private resourceService: ResourceService,
  ) { }

  async create(createPolicyDto: CreatePolicyDto): Promise<Policy> {
    const existingPolicy = await this.policyRepository.findOne({
      where: { name: createPolicyDto.name },
    });
    if (existingPolicy) {
      throw new ConflictException('A policy with this name already exists');
    }
    let resource;
    if (createPolicyDto.resource) {
      try {
        resource = await this.resourceService.findOne(createPolicyDto.resource);
      } catch (error) { }

      if (!resource) {
        createPolicyDto.resource = null;
      }
    }
    const policy = this.policyRepository.create({
      ...createPolicyDto,
      resource,
    });

    return await this.policyRepository.save(policy);
  }

  async findAll(): Promise<Policy[]> {
    return await this.policyRepository.find({
      relations: ['roles', 'permissions'],
    });
  }

  async update(id: string, updatePolicyDto: CreatePolicyDto): Promise<Policy> {
    const policy = await this.findOne(id);
    if (!policy) {
      throw new NotFoundException(`Policy with ID ${id} not found`);
    }
    Object.assign(policy, updatePolicyDto); // Merge the updates into the found policy entity
    await this.policyRepository.save(policy); // Save the updated policy entity

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
      throw new NotFoundException(
        `No policies found for permission ID ${permissionId}`,
      );
    }
    return policies;
  }
  
  // Method to convert policy conditions into TypeORM where clauses
  private convertPolicyConditionsToWhereClauses(policyConditions: any, user: User): FindOptionsWhere<any>[] {
    if (!policyConditions) {
      return [];
    }
    if (typeof policyConditions === 'string') {
      // Parse the string into an object
      policyConditions = JSON.parse(policyConditions);
    }

    let whereClauses: FindOptionsWhere<any>[] = [];

    const addConditionToWhereClauses = (condition: any) => {
      switch (condition.operator) {
        case '=':
          whereClauses.push({ [condition.field]: Equal(condition.value=='Me()'? user.id : condition.value) });
          break;
        case 'LIKE':
          whereClauses.push({ [condition.field]: Like(`%${condition.value}%`) });
          break;
        case '<':
          whereClauses.push({ [condition.field]: LessThan(condition.value) });
          break;
        case '<=':
          whereClauses.push({ [condition.field]: LessThanOrEqual(condition.value) });
          break;
        case '>':
          whereClauses.push({ [condition.field]: MoreThan(condition.value) });
          break;
        case '>=':
          whereClauses.push({ [condition.field]: MoreThanOrEqual(condition.value) });
          break;
        case '!=':
          whereClauses.push({ [condition.field]: Not(Equal(condition.value)) });
          break;
        case 'IN':
          whereClauses.push({ [condition.field]: In(condition.value== "isOneOfMyGroups()"? this.getUserGroupIds(user): condition.value) }); // assuming condition.value is an array
          break;
        case 'BETWEEN':
          whereClauses.push({ [condition.field]: Between(condition.value.start, condition.value.end) }); // assuming condition.value has 'start' and 'end' properties
          break;
        case 'IS NULL':
          whereClauses.push({ [condition.field]: IsNull() });
          break;
        // Add more cases as necessary for your application
        default:
          throw new Error(`Unsupported operator: ${condition.operator}`);
      }
    };
    

    const processConditions = (conditions: any) => {
      if (conditions.logic === 'AND' && conditions.conditions) {
        conditions.conditions.forEach((cond: any) => {
          if (this.isCondition(cond)) {
            addConditionToWhereClauses(cond);
          } else if ('conditions' in cond && Array.isArray(cond.conditions)) {
            // Recursively process nested conditions
            processConditions(cond);
          }
        });
      }
    };

    if ('conditions' in policyConditions && Array.isArray(policyConditions.conditions)) {
      processConditions(policyConditions);
    }

    return whereClauses;
  }

  // Method to determine if an object is a condition
  private isCondition(condition: any): boolean {
    return condition && 'field' in condition && 'operator' in condition && 'value' in condition;
  }

  // Method to retrieve policy conditions for a user and convert them into TypeORM where clauses
  async getDataPolicyConditionsForUser(user: User, resourceType: string): Promise<FindOptionsWhere<any>[]> {
    const policies = await this.retrievePoliciesForUserAndResource(user, resourceType);
    if (!policies) {
      return [];
    }
    // Initialize an array to hold all combined conditions from each policy
    let combinedPolicyConditions: FindOptionsWhere<any>[] = [];

    for (const policy of policies) {
      const policyConditions = this.convertPolicyConditionsToWhereClauses(policy.conditions, user);
      combinedPolicyConditions = [...combinedPolicyConditions, ...policyConditions];
    }

    return combinedPolicyConditions;
  }


  async retrievePoliciesForUserAndResource(user: User, table: string): Promise<Policy[]> {
    // Assuming you have a method on the user object or service to get user's roles
    console.log(user)
    const userRoles = user.roles;

    // Now, find the policies that apply to these roles and the specified resource type
    const policies = await this.policyRepository
      .createQueryBuilder("policy")
      .innerJoin("policy.roles", "role") // Adjust "policy.roles" to the actual property name
      .where("role.id IN (:...roleIds)", { roleIds: userRoles.map(role => role.id) })
      .andWhere("policy.table = :table", { table })
      .andWhere("policy.action = :action", { action: PolicyAction.FILTER })
      .getMany();      
    // ... add logic to filter policies based on permissions if necessary ...
    console.log(policies);
    return policies || [];    
  }
  

  async findAllFilters(
    skip = 0,
    take = 10,
    sortField = 'id',
    sortOrder: 'ASC' | 'DESC' = 'ASC',
    search: string,
  ): Promise<PolicyAPIDto> {
    let whereCondition = {};

    if (search) {
      whereCondition = {
        name: Like(`%${search}%`),
      };
    }

    const [result, total] = await this.policyRepository.findAndCount({
      where: whereCondition,
      order: { [sortField]: sortOrder },
      skip,
      take,
    });

    if (total === 0) {
      // TBD
    }
    return {
      row_count: total,
      rows: result,
    };
  }

  async findOne(id: string): Promise<Policy> {
    const policy = await this.policyRepository.findOne({
      where: { id: id },
      relations: ['roles', 'permissions'],
    });
    if (!policy) {
      throw new NotFoundException(`Policy with ID ${id} not found`);
    }
    return policy;
  }

  private evaluatePolicy(
    policy: Policy,
    attributes: Record<string, any>,
  ): boolean {
    if (!policy.conditions) {
      return true;
    }

    return Object.keys(policy.conditions).every((conditionKey) => {
      const conditionValue = policy.conditions[conditionKey];
      const attributeValue = attributes[conditionKey];

      // Add more complex evaluation logic as needed, e.g., regex, numerical comparisons, etc.
      return attributeValue !== undefined && attributeValue === conditionValue;
    });
  }

  async addRoles(policyID: string, rolesToUpdate: string[]): Promise<Policy> {
    const policy = await this.policyRepository.findOne({ where: { id: policyID }, relations: ['roles'] });
    if (!policy) {
      throw new NotFoundException('Policy not found');
    }

    for (const roleId of rolesToUpdate) {
      const role = await this.roleService.findOne(roleId);
      if (!role) {
        continue; // Skip if role not found. Alternatively, you can throw an exception.
      }
      // Add role to policy.roles if it doesn't exist
      if (!policy.roles.some(r => r.id === roleId)) {
        policy.roles.push(role);
      }
    }

    await this.policyRepository.save(policy);
    return policy;
  }
  async removeRoles(policyID: string, rolesToUpdate: string[]): Promise<Policy> {
    const policy = await this.policyRepository.findOne({ where: { id: policyID }, relations: ['roles'] });
    if (!policy) {
      throw new NotFoundException('Policy not found');
    }

    for (const roleId of rolesToUpdate) {
      // Remove role from policy.roles
      const index = policy.roles.findIndex(r => r.id === roleId);
      if (index !== -1) {
        policy.roles.splice(index, 1);
      }
    }

    await this.policyRepository.save(policy);
    return policy;
  }
  async addPermissions(policyID: string, permissionsToUpdate: string[]): Promise<Policy> {
    const policy = await this.policyRepository.findOne({ where: { id: policyID }, relations: ['permissions'] });
    if (!policy) {
      throw new NotFoundException('Policy not found');
    }

    for (const permissionId of permissionsToUpdate) {
      const permission = await this.permissionService.findOne(permissionId);
      if (!permission) {
        continue; // Skip if permission not found. Alternatively, you can throw an exception.
      }
      // Add permission to policy.permissions if it doesn't exist
      if (!policy.permissions.some(p => p.id === permissionId)) {
        policy.permissions.push(permission);
      }
    }

    await this.policyRepository.save(policy);
    return policy;
  }
  async removePermissions(policyID: string, permissionsToUpdate: string[]): Promise<Policy> {
    const policy = await this.policyRepository.findOne({ where: { id: policyID }, relations: ['permissions'] });
    if (!policy) {
      throw new NotFoundException('Policy not found');
    }

    for (const permissionId of permissionsToUpdate) {
      // Remove permission from policy.permissions
      const index = policy.permissions.findIndex(p => p.id === permissionId);
      if (index !== -1) {
        policy.permissions.splice(index, 1);
      }
    }

    await this.policyRepository.save(policy);
    return policy;
  }

  // A dictionary to map function statements to their corresponding implementations
  private functionStatements: { [key: string]: (user: User) => any } = {
    Me: (user) => user.id,
    isOneOfMyGroups: async (user) => await this.getUserGroupIds(user),
    thisWeek: () => Between(startOfWeek(new Date()), endOfWeek(new Date())),
    thisMonth: () => Between(startOfMonth(new Date()), endOfMonth(new Date())),
    thisYear: () => Between(startOfYear(new Date()), endOfYear(new Date())),
  };
  
  // A mock function to get user group IDs (you'll need to implement this according to your data sources)
  getUserGroupIds(user: User): string[] {
    // Assuming 'user.groups' is an array of Group entities and each group entity has an 'id' property
    if (user.groups) {
      // Map over the groups and return an array of their IDs
      return user.groups.map((group) => group.id);
    }
    return [];
  }

}
function startOfWeek(arg0: Date): any {
  throw new Error('Function not implemented.');
}

function endOfWeek(arg0: Date): any {
  throw new Error('Function not implemented.');
}

function startOfMonth(arg0: Date): any {
  throw new Error('Function not implemented.');
}

function endOfMonth(arg0: Date): any {
  throw new Error('Function not implemented.');
}

function startOfYear(arg0: Date): any {
  throw new Error('Function not implemented.');
}

function endOfYear(arg0: Date): any {
  throw new Error('Function not implemented.');
}
