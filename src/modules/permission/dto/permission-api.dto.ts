import { Permission } from "../entities/permission.entity";

export class PermissionAPIDto {
  row_count: number;
  rows: Permission[];
}
