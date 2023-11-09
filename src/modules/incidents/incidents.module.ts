import { Module } from '@nestjs/common';
import { IncidentsService } from './incidents.service';
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

@Module({
  imports: [
    TypeOrmModule.forFeature([Incident, IncidentCategory, IncidentComment]),
    ProductionLinesModule,
    MachinesModule,
    NotificationsModule,
    GroupsModule,
    UsersModule,
    SocketsModule,
  ],
  controllers: [IncidentsController],
  providers: [IncidentsService, IncidentStatusValidationPipe],
  exports: [IncidentsService]
})
export class IncidentsModule {}
