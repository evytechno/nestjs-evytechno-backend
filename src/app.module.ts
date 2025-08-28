import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Module,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ServicesModule } from './services/services.module';
import { ElementModule } from './element/element.module';

import * as dotenv from 'dotenv';
import { Response } from 'express';
import { AuthModule } from './auth/auth.module';
import { BlogPostService } from './blog-post/blog-post.service';
import { BlogPostModule } from './blog-post/blog-post.module';

dotenv.config({ path: '.env' });

if (!process.env.DATABASE_URL) {
  throw new Error('Database URl not found');
} else {
  console.log('Database Connected');
}

@Module({
  imports: [
    UserModule,
    ServicesModule,
    MongooseModule.forRoot(process.env.DATABASE_URL),
    ServicesModule,
    ElementModule,
    AuthModule,
    BlogPostModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

@Catch(HttpException)
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    let message: string;
    let errors: string[] | null = null;

    if (typeof exceptionResponse === 'string') {
      message = exceptionResponse;
    } else if (
      typeof exceptionResponse === 'object' &&
      exceptionResponse !== null
    ) {
      const resp = exceptionResponse as { message?: string; errors?: string[] };
      message = resp.message ?? 'Error occurred';
      errors = resp.errors ?? null;
    } else {
      message = 'Error occurred';
    }

    response.status(status).json({
      statusCode: status,
      success: false,
      message,
      errors,
    });
  }
}
