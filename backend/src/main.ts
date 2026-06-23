import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { fromReadableStreamLike } from 'rxjs/internal/observable/innerFrom';

async function bootstrap() {

  const app =
    await NestFactory.create(
      AppModule
    );

  app.enableCors({
    origin: '*',
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: false,
      transform: true,
      forbidNonWhitelisted: false,
    }),
  );

  await app.listen(
    process.env.PORT || 5000,
  );
}

bootstrap();