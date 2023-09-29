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
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Incident } from './entities/incident.entity';
import { CurrentUser } from '@auth/auth.decorator';
import { User } from '@users/entities/user.entity';
import { IncidentCategory } from './entities/incident-category.entity';
import { CreateIncidentCategoryDto } from './dto/create-incident-category.dto';
import { UpdateIncidentCategoryDto } from './dto/update-incident-category.dto';

@ApiTags('Incidents')
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

  // Incident Categories
  @Post('categories')
  @ApiCreatedResponse({
    type: IncidentCategory,
  })
  @ApiBearerAuth()
  async createCategory(
    @Body() createIncidentCategoryDto: CreateIncidentCategoryDto,
  ): Promise<IncidentCategory> {
    return await this.incidentsService.createCategory(
      createIncidentCategoryDto,
    );
  }

  @Get('categories')
  @ApiOkResponse({
    type: [IncidentCategory],
  })
  @ApiBearerAuth()
  async findAllCategories(): Promise<IncidentCategory[]> {
    return await this.incidentsService.findAllCategories();
  }

  @Get('categories/:id')
  @ApiOkResponse({
    type: IncidentCategory,
  })
  @ApiBearerAuth()
  async findOneCategory(@Param('id') id: string): Promise<IncidentCategory> {
    return await this.incidentsService.findOneCategory(id);
  }

  @Patch('categories/:id')
  @ApiOkResponse({
    type: IncidentCategory,
  })
  @ApiBearerAuth()
  async updateCategory(
    @Param('id') id: string,
    @Body() updateIncidentCategoryDto: UpdateIncidentCategoryDto,
  ) {
    return await this.incidentsService.update(id, updateIncidentCategoryDto);
  }

  @Delete('categories/:id')
  @ApiOkResponse()
  @ApiBearerAuth()
  async deleteCategory(@Param('id') id: string): Promise<void> {
    await this.deleteCategory(id);
  }
}
