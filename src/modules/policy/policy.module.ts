import { Module } from '@nestjs/common';
import { PolicyService } from './policy.service';
import { PolicyController } from './policy.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Policy } from './entities/policy.entity';
import { RoleModule } from '../role/role.module';
import { PermissionModule } from '../permission/permission.module';
import { ResourceModule } from '../resource/resource.module';

@Module({

  imports: [
    TypeOrmModule.forFeature([Policy], ),
    RoleModule,
    PermissionModule,
    ResourceModule

  ],
    providers: [PolicyService,],
  controllers: [PolicyController],
  exports: [PolicyService], 

})
export class PolicyModule {}
