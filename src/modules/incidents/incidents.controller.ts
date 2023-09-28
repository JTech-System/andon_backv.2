import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { IncidentsService } from './incidents.service';
import { CreateIncidentDto } from './dto/create-incident.dto';
import { UpdateIncidentDto } from './dto/update-incident.dto';
import { ApiBearerAuth, ApiCreatedResponse } from '@nestjs/swagger';
import { Incident } from './entities/incident.entity';
import { CurrentUser } from '@auth/auth.decorator';
import { User } from '@users/entities/user.entity';

@Controller('incidents')
export class IncidentsController {
  constructor(private readonly incidentsService: IncidentsService) {}

  @Post()
  @ApiCreatedResponse({
    type: Incident,
  })
  @ApiBearerAuth()
  async create(
    @Body() createIncidentDto: CreateIncidentDto,
    @CurrentUser() currentUser: User,
  ): Promise<Incident> {
    return this.incidentsService.create(createIncidentDto, currentUser);
  }

  // @Get()
  // findAll() {
  //   return this.incidentsService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.incidentsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateIncidentDto: UpdateIncidentDto) {
  //   return this.incidentsService.update(+id, updateIncidentDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.incidentsService.remove(+id);
  // }
}
