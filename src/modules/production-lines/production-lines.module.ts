import { Module } from '@nestjs/common';
import { ProductionLinesService } from './production-lines.service';
import { ProductionLinesController } from './production-lines.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductionLine } from './entities/production-line.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductionLine])],
  controllers: [ProductionLinesController],
  providers: [ProductionLinesService],
  exports: [ProductionLinesService]
})
export class ProductionLinesModule {}
