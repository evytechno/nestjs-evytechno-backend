import { NestFactory } from '@nestjs/core';
import { AllExceptionsFilter, AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt/jwt-auth.guard';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(bodyParser.json({ limit: '50mb' })); // for JSON
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });

  // Global Exveption Handling
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,

      exceptionFactory: (errors) => {
        const formattedErrors = errors.map((err) => {
          return {
            field: err.property,
            errors: Object.values(err.constraints ?? {}),
          };
        });
        return new BadRequestException({
          statusCode: 400,
          message: 'Validation failed',
          errors: formattedErrors,
        });
      },
    }),
  );
  // default prefix /api for api calls
  app.setGlobalPrefix('/api');
  // Cors
  app.enableCors({
    origin: 'http://localhost:8000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Global Guards
  // app.useGlobalGuards(app.get(JwtAuthGuard));
  // console.log(process.env.PORT, process.env.HOSTNAME);
  // await app.listen(5000, `127.0.0.1`);
  await app.listen(
    Number(process.env.PORT) || 5001,
    process.env.HOST ?? `127.0.0.1`,
  );

  // await app.listen(
  //   process.env.PORT ?? 3000,
  //   process.env.HOSTNAME ?? '127.0.0.1',
  // );
  app.useGlobalFilters(new AllExceptionsFilter());
}
bootstrap();
