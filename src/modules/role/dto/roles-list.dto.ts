import { Role } from '../entities/role.entity';

export class RolesResponseDto {
  row_count: number;
  rows: Role[];
}
