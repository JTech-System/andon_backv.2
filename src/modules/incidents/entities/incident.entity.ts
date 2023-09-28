import { ApiProperty } from '@nestjs/swagger';
import { ResponseUserDto } from '@users/dto/response-user.dto';
import { User } from '@users/entities/user.entity';
import { BaseEntity } from '@utils/entities/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Incident extends BaseEntity {
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

  @ApiProperty({
    required: false,
  })
  @Column({
    nullable: true,
  })
  closedOn: Date;

  @ApiProperty({
    type: ResponseUserDto,
    required: false,
  })
  @ManyToOne(() => User, (user) => user.id, {
    nullable: true,
  })
  closedBy?: User;

  @ApiProperty()
  @Column({
    type: 'text',
  })
  description: string;

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
  @Column()
  resolutionTimeInMinutes: number;

  @ApiProperty({
    type: ResponseUserDto,
    required: false,
  })
  @ManyToOne(() => User, (user) => user.id, {
    nullable: true,
  })
  assignedTo: User;

  //   "category": "Equipo de Scaneo", # this is of incidents
  //   "production_line": "ARM REST U553 DP", # not of incidents
  //   "machine": "", # not of incidents
  //   "priority": "", # this is of incidents
  //   "state": "Unassigned", # are defined

  //   "assigned_group": "",

  //   "downtime": "0", # Can be calculated
  //   "close_notes": "", # Is not the same as proposed solution
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
