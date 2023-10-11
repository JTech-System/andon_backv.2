import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from './entities/group.entity';
import { RoleModule } from '../role/role.module';
import { UsersModule } from '@users/users.module';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';

@Module({
    imports: [TypeOrmModule.forFeature([Group]), RoleModule, UsersModule],
    controllers: [GroupController],
    providers: [GroupService],
    exports: [GroupService],
})
export class GroupsModule {}
