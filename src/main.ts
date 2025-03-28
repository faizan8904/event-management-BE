import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));

  const config = new DocumentBuilder()
    .setTitle('Event Management API')
    .setDescription('API for managing events, users, and tickets')
    .setVersion('1.0')
    .addBearerAuth() // JWT ke liye
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // /api endpoint pe Swagger UI


  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
