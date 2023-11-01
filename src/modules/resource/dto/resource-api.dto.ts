import { Resource } from 'src/modules/resource/entities/resource.entity';

export class ResourceAPIDto {
  row_count: number;
  rows: Resource[];
}
