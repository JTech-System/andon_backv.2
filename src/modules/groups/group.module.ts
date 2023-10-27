import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from './entities/group.entity';
import { RoleModule } from '../role/role.module';

import { GroupController } from './group.controller';
import { GroupService } from './group.service';
import { UsersModule } from '@users/users.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Group]),
        RoleModule,
        forwardRef(() => UsersModule),
    ],
    controllers: [GroupController],
    providers: [GroupService],
    exports: [GroupService],
})
export class GroupsModule {}
