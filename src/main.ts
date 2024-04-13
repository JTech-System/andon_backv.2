import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';
import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // httpsOptions: {
    //   key: fs.readFileSync('./key.pem'),
    //   cert: fs.readFileSync('./cert.pem'),
    // },
  });

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors();
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Andon API')
    .setVersion('2.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    customSiteTitle: 'Andon API',
  });

  await app.listen(process.env.PORT || 3000, '0.0.0.0');
}

bootstrap(); 
