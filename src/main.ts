import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionFilter } from './common/filters/http-exception.filter';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Configurar CORS para permitir que Angular reciba las cookies
  app.enableCors({
    origin: 'http://localhost:4200',
    credentials: true,
  });

  //Permitir el uso de cookies
  app.use(cookieParser());

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }));

  //Uso de fitros globales
  app.useGlobalFilters(new AllExceptionFilter());

  //Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('API con Vulnerabilidades de Seguridad')
    .setDescription('Documentación de la API para pruebas')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();



//? MYSQL
//! npm install mysql2
//! npm install @types/mysql2 -D

//? POSTGRES
//! npm install pg
//! npm install @types/pg -D

//? SWAGGER
//! npm install @nestjs/swagger

//? BCRYPT
//! npm i bcrypt
//! npm i @types/bcrypt -D