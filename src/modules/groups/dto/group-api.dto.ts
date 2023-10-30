import { Group } from '../entities/group.entity';

export class GroupAPIListDto {
  row_count: number;
  rows: Group[];
}
