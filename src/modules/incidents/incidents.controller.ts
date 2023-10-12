import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { IncidentsService } from './incidents.service';
import { CreateIncidentDto } from './dto/create-incident.dto';
import { UpdateIncidentDto } from './dto/update-incident.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Incident } from './entities/incident.entity';
import { CurrentUser } from '@auth/auth.decorator';
import { User } from '@users/entities/user.entity';
import { IncidentCategory } from './entities/incident-category.entity';
import { CreateIncidentCategoryDto } from './dto/create-incident-category.dto';
import { UpdateIncidentCategoryDto } from './dto/update-incident-category.dto';
import { PaginationIncidentDto } from './dto/pagination-incident.dto';
import {
  IncidentStatus,
  IncidentStatusArray,
} from './enums/incident-status.enum';
import { IncidentStatusValidationPipe } from './pipes/incident-status-validation.pipe';
import { UUIDValidationPipe } from '@utils/pipes/uuid-validation.pipe';
import { DateValidationPipe } from '@utils/pipes/date-validation.pipe';
import { CreateIncidentCommentDto } from './dto/create-incident-comment.dto';
import { NotificationFieldsDto } from '@utils/dto/notification-fields.dto';

@ApiTags('Incidents')
@Controller('incidents')
export class IncidentsController {
  constructor(private readonly incidentsService: IncidentsService) {}

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
    return await this.incidentsService.updateCategory(
      id,
      updateIncidentCategoryDto,
    );
  }

  @Delete('categories/:id')
  @ApiOkResponse()
  @ApiBearerAuth()
  async deleteCategory(@Param('id') id: string): Promise<void> {
    await this.incidentsService.deleteCategory(id);
  }

  // Incident comments

  @Post('comments')
  @ApiOkResponse({
    type: Incident,
  })
  @ApiBearerAuth()
  async createComment(
    @Body() createIncidentCommentDto: CreateIncidentCommentDto,
    @CurrentUser() currentUser: User,
  ) {
    return await this.incidentsService.createComment(
      createIncidentCommentDto,
      currentUser,
    );
  }

  // Notifications
  @Get('notifications')
  @ApiOkResponse({
    type: NotificationFieldsDto,
  })
  @ApiBearerAuth()
  notifications(): NotificationFieldsDto {
    return {
      status: [
        {
          name: 'Sin asignar',
          value: 'UNASSIGNED',
        },
        {
          name: 'Asignado',
          value: 'ASSIGNED',
        },
        {
          name: 'En progreso',
          value: 'IN PROGRESS',
        },
        {
          name: 'Cerrado',
          value: 'CLOSED',
        },
        {
          name: 'Cancelado',
          value: 'CANCELED',
        },
      ],
      priority: [
        {
          name: 'P1',
          value: 'P1',
        },
        {
          name: 'P2',
          value: 'P2',
        },
        {
          name: 'P3',
          value: 'P3',
        },
      ],
      description: [],
    };
  }

  // Incidents

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

  @Get()
  @ApiOkResponse({
    type: PaginationIncidentDto,
  })
  @ApiQuery({
    name: 'pageSize',
    type: Number,
    required: false,
    enum: [5, 10, 25, 100],
  })
  @ApiQuery({
    name: 'page',
    type: Number,
    required: false,
  })
  @ApiQuery({
    name: 'search',
    type: String,
    required: false,
  })
  @ApiQuery({
    name: 'status',
    type: String,
    enum: IncidentStatusArray,
    required: false,
  })
  @ApiQuery({
    name: 'categoryId',
    type: String,
    required: false,
  })
  @ApiQuery({
    name: 'startCreatedOn',
    type: Date,
    required: false,
  })
  @ApiQuery({
    name: 'endCreatedOn',
    type: Date,
    required: false,
  })
  @ApiQuery({
    name: 'groupId',
    type: String,
    required: false,
  })
  @ApiBearerAuth()
  async findAll(
    @Query('pageSize', new ParseIntPipe({ optional: true })) pageSize?: number,
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
    @Query('search') search?: string,
    @Query('status', new IncidentStatusValidationPipe())
    status?: IncidentStatus,
    @Query(
      'categoryId',
      new UUIDValidationPipe({
        optional: true,
      }),
    )
    categoryId?: string,
    @Query('startCreatedOn', new DateValidationPipe({ optional: true }))
    startCreatedOn?: Date,
    @Query('endCreatedOn', new DateValidationPipe({ optional: true }))
    endCreatedOn?: Date,
    @Query('groupId', new UUIDValidationPipe({ optional: true }))
    groupId?: string,
  ): Promise<PaginationIncidentDto> {
    return await this.incidentsService.findAll(
      pageSize ?? 25,
      page ?? 1,
      search,
      status,
      categoryId,
      startCreatedOn,
      endCreatedOn,
      groupId,
    );
  }

  @Get(':id')
  @ApiOkResponse({
    type: Incident,
  })
  @ApiBearerAuth()
  async findOne(@Param('id') id: string): Promise<Incident> {
    return await this.incidentsService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({
    type: Incident,
  })
  @ApiBearerAuth()
  async update(
    @Param('id') id: string,
    @Body() updateIncidentDto: UpdateIncidentDto,
    @CurrentUser() currentUser: User,
  ): Promise<Incident> {
    return await this.incidentsService.update(
      id,
      updateIncidentDto,
      currentUser,
    );
  }

  @Delete(':id')
  @ApiOkResponse()
  @ApiBearerAuth()
  async remove(@Param('id') id: string): Promise<void> {
    await this.incidentsService.remove(id);
  }
}
