import { BaseEntity } from '@utils/entities/base.entity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Policy extends BaseEntity{

  @Column()
  userId: string;

  @Column()
  action: string;

  @Column()
  resource: string;

  @Column({ type: 'json', nullable: true })
  conditions: any;  // set of specific conditions

  //...tbd
}
