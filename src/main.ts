import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';
import { HttpExceptionFilter } from './utils/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable global filters for error handling
  //app.useGlobalFilters(new HttpExceptionFilter());
  
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }));

  // Configure CORS with specific allowed origins
  app.enableCors({
    origin: process.env.ALLOWED_ORIGINS.split(','),
  });

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

  // Make the port configurable
  await app.listen(process.env.APP_PORT || 3000);
}

bootstrap();
