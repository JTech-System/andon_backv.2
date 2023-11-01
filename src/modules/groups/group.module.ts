import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from './entities/group.entity';
import { RoleModule } from '../role/role.module';

import { GroupsController } from './group.controller';
import { GroupsService } from './group.service';
import { UsersModule } from '@users/users.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Group]),
        RoleModule,
        forwardRef(() => UsersModule),
    ],
    controllers: [GroupsController],
    providers: [GroupsService],
    exports: [GroupsService],
})
export class GroupsModule {}
