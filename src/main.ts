import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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