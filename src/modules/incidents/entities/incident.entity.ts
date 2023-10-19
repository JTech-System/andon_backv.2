import {
  IncidentPrioritiesArray,
  IncidentPriority,
} from '@incidents/enums/incident-priority.enum';
import {
  IncidentStatus,
  IncidentStatusArray,
} from '@incidents/enums/incident-status.enum';
import { ApiProperty } from '@nestjs/swagger';
import { ResponseUserDto } from '@users/dto/response-user.dto';
import { User } from '@users/entities/user.entity';
import { BaseEntity } from '@utils/entities/base.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { IncidentCategory } from './incident-category.entity';
import { ProductionLine } from '@production-lines/entities/production-line.entity';
import { Machine } from '@machines/entities/machine.entity';
import { IncidentComment } from './incident-comment.entity';
import { Group } from '@groups/entities/group.entity';

@Entity()
export class Incident extends BaseEntity {
  // Required
  @ApiProperty({
    maxLength: 16,
  })
  @Column({
    length: 16,
  })
  number: string;

  @ApiProperty({
    maxLength: 128,
  })
  @Column({
    length: 128,
  })
  employee: string;

  @ApiProperty({
    type: ResponseUserDto,
  })
  @ManyToOne(() => User, (user) => user.id)
  createdBy: User;

  @ApiProperty({
    type: ResponseUserDto,
  })
  @ManyToOne(() => User, (user) => user.id)
  updatedBy: User;

  @ApiProperty()
  @Column({
    type: 'text',
  })
  description: string;

  @ApiProperty({
    enum: IncidentStatusArray,
  })
  @Column({
    type: 'enum',
    enum: IncidentStatusArray,
  })
  status: IncidentStatus;

  @ApiProperty({
    type: IncidentCategory,
  })
  @ManyToOne(() => IncidentCategory, (incidentCategory) => incidentCategory.id)
  category: IncidentCategory;

  @ApiProperty({
    type: ProductionLine,
  })
  @ManyToOne(() => ProductionLine, (productionLine) => productionLine.id)
  productionLine: ProductionLine;

  // Optional

  @ApiProperty({
    required: false,
  })
  @Column({
    nullable: true,
  })
  closedOn?: Date;

  @ApiProperty({
    type: ResponseUserDto,
    required: false,
  })
  @ManyToOne(() => User, (user) => user.id, {
    nullable: true,
  })
  closedBy?: User;

  @ApiProperty({
    required: false,
  })
  @Column({
    type: 'text',
    nullable: true,
  })
  proposedSolution?: string;

  @ApiProperty({
    required: false,
  })
  @Column({
    nullable: true,
  })
  resolutionTimeInMinutes: number;

  @ApiProperty({
    required: false,
  })
  @Column({
    type: 'text',
    nullable: true,
  })
  closeNotes?: string;

  @ApiProperty({
    type: ResponseUserDto,
    required: false,
  })
  @ManyToOne(() => User, (user) => user.id, {
    nullable: true,
  })
  assignedTo?: User;

  @ApiProperty({
    enum: IncidentPrioritiesArray,
    required: false,
  })
  @Column({
    type: 'enum',
    enum: IncidentPrioritiesArray,
    nullable: true,
  })
  priority?: IncidentPriority;

  @ApiProperty({
    type: Machine,
    required: false,
  })
  @ManyToOne(() => Machine, (machine) => machine.id, {
    nullable: true,
  })
  machine: Machine;

  @ApiProperty({
    type: [IncidentComment],
  })
  @OneToMany(() => IncidentComment, (comment) => comment.incident)
  comments: IncidentComment[];

  @ApiProperty({
    required: false,
  })
  @Column({
    type: 'int',
    nullable: true,
  })
  timeLapsed?: number;

  @ApiProperty({
    type: Group,
    required: false,
  })
  @ManyToOne(() => Group, (group) => group.id)
  assignedGroup: Group;

  //   "assigned_group": "",

  //   "downtime": "0", # Can be calculated
  //   "url": "http://192.168.0.160:4200/incident-details?_id=650e09f5636c32a773edbd11", # Not necessary
  //   "task_sla": {
  //     "$oid": "650e09f5636c32a773edbd12" # sla = service level agreement

  //    "comments": []
}

/*
You have two times:
- from crate to assign: 5 minutes (the time will not change)

Can be reopen and the SLA restarts
*/
