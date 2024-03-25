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
    type: ResponseUserDto,
  })
  @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
  createdBy: User;

  @ApiProperty({
    type: ResponseUserDto,
  })
  @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
  updatedBy: User;

  @ApiProperty({
    maxLength: 16,
  })
  @Column({
    length: 16,
    unique: true
  })
  number: string;

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
  @ManyToOne(
    () => IncidentCategory,
    (incidentCategory) => incidentCategory.id,
    { onDelete: 'CASCADE' },
  )
  category: IncidentCategory;

  @ApiProperty({
    type: ProductionLine,
  })
  @ManyToOne(() => ProductionLine, (productionLine) => productionLine.id, {
    onDelete: 'CASCADE',
  })
  productionLine: ProductionLine;

  @ApiProperty({
    maxLength: 128,
  })
  @Column({
    length: 128,
  })
  employee: string;

  // Optional

  @ApiProperty({
    type: Group,
    required: false,
  })
  @ManyToOne(() => Group, (group) => group.id, { onDelete: 'CASCADE' })
  assignedGroup: Group;

  @ApiProperty({
    type: ResponseUserDto,
    required: false,
  })
  @ManyToOne(() => User, (user) => user.id, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  assignedTo?: User;

  @ApiProperty({
    type: Machine,
    required: false,
  })
  @ManyToOne(() => Machine, (machine) => machine.id, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  machine: Machine;

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
    type: ResponseUserDto,
    required: false,
  })
  @ManyToOne(() => User, (user) => user.id, {
    onDelete: 'CASCADE',
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
    required: false,
  })
  @Column({
    nullable: true,
  })
  inProgressOn?: Date;

  @ApiProperty({
    required: false,
  })
  @Column({
    nullable: true,
  })
  closedOn?: Date;

  @ApiProperty({
    required: false,
  })
  @Column({
    nullable: true,
  })
  closeTimeLapsed?: number;

  @ApiProperty({
    type: [IncidentComment],
  })
  @OneToMany(() => IncidentComment, (comment) => comment.incident)
  comments: IncidentComment[];
}
