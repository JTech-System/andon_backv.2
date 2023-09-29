import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '@utils/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class ProductionLine extends BaseEntity {
  @ApiProperty({
    maxLength: 128,
  })
  @Column({
    length: 128,
  })
  value: string;
}
