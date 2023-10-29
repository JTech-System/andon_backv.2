import { User } from '../entities/user.entity';

export class UserAPIListDto {
  row_count: number;
  rows: User[];
}
