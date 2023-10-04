import { Module } from '@nestjs/common';
import { IncidentsService } from './incidents.service';
import { IncidentsController } from './incidents.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Incident } from './entities/incident.entity';
import { IncidentCategory } from './entities/incident-category.entity';
import { ProductionLinesModule } from '@production-lines/production-lines.module';
import { IncidentStatusValidationPipe } from './pipes/incident-status-validation.pipe';

@Module({
  imports: [
    TypeOrmModule.forFeature([Incident, IncidentCategory]),
    ProductionLinesModule,
  ],
  controllers: [IncidentsController],
  providers: [IncidentsService, IncidentStatusValidationPipe],
})
export class IncidentsModule {}
