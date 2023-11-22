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
  Res,
} from '@nestjs/common';
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
import { IncidentsService } from './services/incidents.service';
import { IncidentCategoriesService } from './services/incident-categories.service';
import { IncidentCommentsService } from './services/incident-comments.service';
import { Response } from 'express';

@ApiTags('Incidents')
@Controller('incidents')
export class IncidentsController {
  constructor(
    private readonly incidentsService: IncidentsService,
    private readonly incidentCategoriesService: IncidentCategoriesService,
    private readonly incidentCommentsService: IncidentCommentsService,
  ) {}

  // Incident Categories

  @Post('categories')
  @ApiCreatedResponse({
    type: IncidentCategory,
  })
  @ApiBearerAuth()
  async createCategory(
    @Body() createIncidentCategoryDto: CreateIncidentCategoryDto,
  ): Promise<IncidentCategory> {
    return await this.incidentCategoriesService.create(
      createIncidentCategoryDto,
    );
  }

  @Get('categories')
  @ApiOkResponse({
    type: [IncidentCategory],
  })
  async findAllCategories(): Promise<IncidentCategory[]> {
    return await this.incidentCategoriesService.findAll();
  }

  @Get('categories/:id')
  @ApiOkResponse({
    type: IncidentCategory,
  })
  @ApiBearerAuth()
  async findOneCategory(@Param('id') id: string): Promise<IncidentCategory> {
    return await this.incidentCategoriesService.findOne(id);
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
    return await this.incidentCategoriesService.update(
      id,
      updateIncidentCategoryDto,
    );
  }

  @Delete('categories/:id')
  @ApiOkResponse()
  @ApiBearerAuth()
  async deleteCategory(@Param('id') id: string): Promise<void> {
    await this.incidentCategoriesService.delete(id);
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
    return await this.incidentCommentsService.create(
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
      status: ['Unassigned', 'Assigned', 'In progress', 'Closed', 'Canceled'],
      priority: ['P1', 'P2', 'P3'],
      description: [],
      assignedGroup: ['group'],
      comments: true,
    };
  }

  // CSV

  @Get('csv')
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
    name: 'assignedGroupId',
    type: String,
    required: false,
  })
  @ApiOkResponse({
    content: {
      'text/csv': {},
    },
  })
  @ApiBearerAuth()
  async generateCSV(
    @Res() res: Response,
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
    @Query('assignedGroupId', new UUIDValidationPipe({ optional: true }))
    assignedGroupId?: string,
    @CurrentUser({ optional: true }) currentUser?: User,
  ): Promise<any> {
    const csv = await this.incidentsService.generateCSV(
      search,
      status,
      categoryId,
      startCreatedOn,
      endCreatedOn,
      assignedGroupId,
      currentUser,
    );
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=data.csv');
    res.status(200).send(csv);
  }

  // Incidents

  @Post()
  @ApiCreatedResponse({
    type: Incident,
  })
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
    name: 'assignedGroupId',
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
    @Query('assignedGroupId', new UUIDValidationPipe({ optional: true }))
    assignedGroupId?: string,
    @CurrentUser({ optional: true }) currentUser?: User,
  ): Promise<PaginationIncidentDto> {
    return await this.incidentsService.findAll(
      pageSize ?? 25,
      page ?? 1,
      search,
      status,
      categoryId,
      startCreatedOn,
      endCreatedOn,
      assignedGroupId,
      currentUser,
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
