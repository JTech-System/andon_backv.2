import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './integrations/auth/auth.module';
import { AuthMiddleware } from '@auth/auth.middleware';
import { IncidentsModule } from './modules/incidents/incidents.module';
import { ProductionLinesModule } from './modules/production-lines/production-lines.module';
import { MachinesModule } from './modules/machines/machines.module';

@Module({
  imports: [
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
