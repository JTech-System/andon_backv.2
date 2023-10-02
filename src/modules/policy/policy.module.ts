import { Module } from '@nestjs/common';
import { PolicyService } from './policy.service';
import { PolicyController } from './policy.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Policy } from './entities/policy.entity';

@Module({

  imports: [
    TypeOrmModule.forFeature([Policy]),
  ],
    providers: [PolicyService,],
  controllers: [PolicyController],
  exports: [PolicyService], 

})
export class PolicyModule {}
