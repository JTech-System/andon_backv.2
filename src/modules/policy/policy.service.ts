import { Injectable, NotFoundException, ConflictException, BadRequestException, All } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Any, Between, Equal, FindOptionsWhere, In, Like, Not, Repository, SelectQueryBuilder } from 'typeorm';
import { Policy } from './entities/policy.entity';
import { CreatePolicyDto } from './dto/create-policy.dto';
import { Role } from '../role/entities/role.entity';
import { RoleService } from '../role/role.service';
import { PermissionService } from '../permission/permission.service';
import { User } from '@users/entities/user.entity';
import { PolicyAPIDto } from './dto/resource-api.dto';

@Injectable()
export class PolicyService {
  constructor(
    @InjectRepository(Policy)
    private policyRepository: Repository<Policy>,
    private roleService: RoleService,
    private permissionService: PermissionService,

  ) {}
  // A dictionary to map function statements to their corresponding implementations
  private functionStatements: { [key: string]: (user: User) => any } = {
    'Me': (user) => user.id,
    'isOneOfMyGroups': async (user) => await this.getUserGroupIds(user),
    'thisWeek': () => Between(startOfWeek(new Date()), endOfWeek(new Date())),
    'thisMonth': () => Between(startOfMonth(new Date()), endOfMonth(new Date())),
    'thisYear': () => Between(startOfYear(new Date()), endOfYear(new Date())),
    // Add 'LastWeek', 'LastMonth', 'LastYear', etc...
  };
  
  // A method to interpret string policies and convert them to query objects
  private parsePolicyCondition(policyString: string, user: User): FindOptionsWhere<any> | Promise<FindOptionsWhere<any>> {
    // This is a placeholder for actual parsing logic, which will be complex and needs to handle nested structures
    // For simplicity, I am assuming policyString is a JSON string that represents the query structure
    const policyObject = JSON.parse(policyString);
  
    // A helper function to handle individual conditions
    const handleCondition = (condition: any): any => {
      // Extract field, operator, and value from condition
      const { field, operator, value } = condition;
      let whereClause: any = {};
  
      // You might need a more sophisticated switch or strategy pattern here to handle various operators
      switch (operator) {
        case 'contains':
          whereClause[field] = Like(`%${value}%`);
          break;
        case 'doesnotcontain':
          whereClause[field] = Not(Like(`%${value}%`));
          break;
        case 'startswith':
          whereClause[field] = Like(`${value}%`);
          break;
        case 'endswith':
          whereClause[field] = Like(`%${value}`);
          break;
        case '=':
          whereClause[field] = Equal(value);
          break;
        case '!=':
          whereClause[field] = Not(Equal(value));
          break;
        // Handle other operators...
        case 'Me()':
          return this.functionStatements['Me'](user).then(val => ({ [field]: val }));
        case 'isOneOfMyGroups()':
          return this.functionStatements['isOneOfMyGroups'](user).then(val => ({ [field]: In(val) }));
        // Add other function handlers here...
        default:
          throw new Error(`Unsupported operator: ${operator}`);
      }
  
      return whereClause;
    };
  
    // Recursively parse the conditions and build the where clause
    const parseConditions = (conditions: any[]): any => {
      return conditions.map(condition => {
        if ('conditions' in condition) {
          // It's a nested condition group
          const logic = condition.logic; // AND or OR
          const nestedConditions = parseConditions(condition.conditions);
          return logic === 'AND' ? All(nestedConditions) : Any(nestedConditions);
        } else {
          // It's a single condition
          return handleCondition(condition);
        }
      });
    };
  
    const whereClause = parseConditions(policyObject.conditions);
  
    // Assuming the top level is always an AND condition
    return whereClause.length === 1 ? whereClause[0] : All(whereClause);
  }


  // This service method will apply the policies to the incoming query parameters
  async applyDataPoliciesToQuery(
    user: User, 
    queryParameters: FindOptionsWhere<any>,
    policyString: string // New parameter for the dynamic policy string
  ): Promise<FindOptionsWhere<any>> {
    // Interpret the dynamic policy string
    const policyFilter: FindOptionsWhere<any> = await this.parsePolicyCondition(policyString, user);

    // Combine the policy filter with the user's query parameters using AND logic
    const combinedFilters: FindOptionsWhere<any> = {
      AND: [policyFilter, queryParameters]
    };

    return combinedFilters;
  }

  // A mock function to get user group IDs (you'll need to implement this according to your data sources)
  async getUserGroupIds(user: User): Promise<string[]> {
    // Assuming 'user.groups' is an array of Group entities and each group entity has an 'id' property
    if (user.groups) {
        // Map over the groups and return an array of their IDs
        return user.groups.map(group => group.id);
    }
    return [];
}

  
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

