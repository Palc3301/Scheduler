import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { MongoError } from 'mongodb';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    if (exception instanceof MongoError) {
      switch (exception.code) {
        case 11000:
          return httpAdapter.reply(
            ctx.getResponse(),
            {
              statusCode: HttpStatus.CONFLICT,
              message: 'Conflict',
            },
            HttpStatus.CONFLICT,
          );
        case 121:
          return httpAdapter.reply(
            ctx.getResponse(),
            {
              statusCode: HttpStatus.BAD_REQUEST,
              message: 'Document failed validation',
            },
            HttpStatus.BAD_REQUEST,
          );
      }
    }

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
