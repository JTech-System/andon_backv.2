import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MachinesService } from './machines.service';
import { CreateMachineDto } from './dto/create-machine.dto';
import { UpdateMachineDto } from './dto/update-machine.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Machine } from './entities/machine.entity';

@ApiTags('Machines')
@Controller('machines')
export class MachinesController {
  constructor(private readonly machinesService: MachinesService) {}

  @Post()
  @ApiCreatedResponse({
    type: Machine,
  })
  @ApiBearerAuth()
  async create(@Body() createMachineDto: CreateMachineDto): Promise<Machine> {
    return await this.machinesService.create(createMachineDto);
  }

  @Get()
  @ApiOkResponse({
    type: [Machine],
  })
  @ApiBearerAuth()
  async findAll(): Promise<Machine[]> {
    return await this.machinesService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({
    type: Machine,
  })
  @ApiBearerAuth()
  async findOne(@Param('id') id: string): Promise<Machine> {
    return await this.machinesService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({
    type: Machine,
  })
  @ApiBearerAuth()
  async update(
    @Param('id') id: string,
    @Body() updateMachineDto: UpdateMachineDto,
  ): Promise<Machine> {
    return await this.machinesService.update(id, updateMachineDto);
  }

  @Delete(':id')
  @ApiOkResponse()
  @ApiBearerAuth()
  async remove(@Param('id') id: string): Promise<void> {
    await this.machinesService.remove(id);
  }
}
