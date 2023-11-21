import { Policy } from '../entities/policy.entity';

export class PolicyAPIDto {
  row_count: number;
  rows: Policy[];
}
