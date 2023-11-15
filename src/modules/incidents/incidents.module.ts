import { Module } from '@nestjs/common';
import { IncidentsController } from './incidents.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Incident } from './entities/incident.entity';
import { IncidentCategory } from './entities/incident-category.entity';
import { ProductionLinesModule } from '@production-lines/production-lines.module';
import { IncidentStatusValidationPipe } from './pipes/incident-status-validation.pipe';
import { MachinesModule } from '@machines/machines.module';
import { IncidentComment } from './entities/incident-comment.entity';
import { NotificationsModule } from '../notifications/notifications.module';
import { GroupsModule } from '@groups/group.module';
import { UsersModule } from '@users/users.module';
import { SocketsModule } from 'src/integrations/sockets/sockets.module';
import { IncidentCategoriesService } from './services/incident-categories.service';
import { IncidentCommentsService } from './services/incident-comments.service';
import { IncidentsService } from './services/incidents.service';
import { PolicyModule } from '../policy/policy.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Incident, IncidentCategory, IncidentComment]),
    ProductionLinesModule,
    MachinesModule,
    NotificationsModule,
    GroupsModule,
    UsersModule,
    SocketsModule,
    PolicyModule
  ],
  controllers: [IncidentsController],
  providers: [
    IncidentsService,
    IncidentStatusValidationPipe,
    IncidentCategoriesService,
    IncidentCommentsService,
  ],
  exports: [IncidentsService],
})
export class IncidentsModule {}
