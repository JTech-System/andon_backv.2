import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from './entities/group.entity';
import { RoleModule } from '../role/role.module';
import { UsersModule } from '@users/users.module';
import { GroupsController } from './group.controller';
import { GroupsService } from './group.service';

@Module({
  imports: [TypeOrmModule.forFeature([Group]), RoleModule, UsersModule],
  controllers: [GroupsController],
  providers: [GroupsService],
  exports: [GroupsService],
})
export class GroupsModule {}
