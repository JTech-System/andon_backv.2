import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './integrations/auth/auth.module';
import { AuthMiddleware } from '@auth/auth.middleware';
import { IncidentsModule } from './modules/incidents/incidents.module';
import { ProductionLinesModule } from './modules/production-lines/production-lines.module';
import { MachinesModule } from './modules/machines/machines.module';
import { RoleModule } from './modules/role/role.module';
import { CacheModule } from '@nestjs/cache-manager';
import { PolicyModule } from './modules/policy/policy.module';
import { PermissionModule } from './modules/permission/permission.module';
import { ResourceModule } from './modules/resource/resource.module';
import { Group } from './modules/groups/entities/group.entity';



@Module({
  imports: [
    CacheModule.register({
      store: 'redis',
      host: 'localhost',
      port: 6379,
    }),
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: 'andon',
      synchronize: true,
      autoLoadEntities: true,
    }),
    //Modules
    UsersModule,
    AuthModule,
    IncidentsModule,
    ProductionLinesModule,
    MachinesModule,
    RoleModule,
    PolicyModule,
    PermissionModule,
    ResourceModule,
    Group
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
