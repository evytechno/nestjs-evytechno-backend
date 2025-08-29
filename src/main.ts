import { NestFactory } from '@nestjs/core';
import { AllExceptionsFilter, AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt/jwt-auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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

  app.setGlobalPrefix('/api');

  // Global Guards
  // app.useGlobalGuards(app.get(JwtAuthGuard));
  console.log(process.env.HOSTNAME, process.env.PORT);
  await app.listen(5000, `127.0.0.1`);

  // await app.listen(
  //   process.env.PORT ?? 3000,
  //   process.env.HOSTNAME ?? '127.0.0.1',
  // );
  app.useGlobalFilters(new AllExceptionsFilter());
}
bootstrap();
