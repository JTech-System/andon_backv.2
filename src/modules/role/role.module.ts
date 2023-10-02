// src/role/role.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '../role/entities/role.entity';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { Permission } from '../permission/entities/permission.entity';
import { CacheModule } from '@nestjs/cache-manager';


@Module({
    imports: [
        
    CacheModule.register(),
      TypeOrmModule.forFeature([Role, Permission])],
    providers: [RoleService],
    controllers: [RoleController],
})
export class RoleModule {}
