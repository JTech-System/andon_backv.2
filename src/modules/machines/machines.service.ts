import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMachineDto } from './dto/create-machine.dto';
import { UpdateMachineDto } from './dto/update-machine.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Machine } from './entities/machine.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MachinesService {
  constructor(
    @InjectRepository(Machine) private machinesRepository: Repository<Machine>,
  ) {}

  async create(createMachineDto: CreateMachineDto): Promise<Machine> {
    const machine = await this.machinesRepository.save(createMachineDto);
    return await this.findOne(machine.id);
  }

  async findAll(): Promise<Machine[]> {
    return await this.machinesRepository.find();
  }

  async findOne(id: string): Promise<Machine> {
    const machine = await this.machinesRepository.findOne({
      where: {
        id,
      },
    });
    if (machine) return machine;
    throw new NotFoundException('Machine not found');
  }

  async update(
    id: string,
    updateMachineDto: UpdateMachineDto,
  ): Promise<Machine> {
    await this.findOne(id);
    await this.machinesRepository.update({ id }, updateMachineDto);
    return await this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.machinesRepository.delete({ id });
  }
}
