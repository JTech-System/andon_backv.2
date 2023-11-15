import { ApiProperty } from '@nestjs/swagger';
import { User } from '@users/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Incident } from './incident.entity';
import { BaseEntity } from '@utils/entities/base.entity';
import { ResponseUserDto } from '@users/dto/response-user.dto';

@Entity()
export class IncidentComment extends BaseEntity {
  @ApiProperty({
    type: ResponseUserDto,
  })
  @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
  createdBy: User;

  @ManyToOne(() => Incident, (incident) => incident.id, {
    onDelete: 'CASCADE',
  })
  incident: Incident;

  @ApiProperty()
  @Column({
    type: 'text',
  })
  value: string;
}
