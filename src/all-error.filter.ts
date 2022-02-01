import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { MongoServerError } from 'mongodb';
import { Error } from 'mongoose';
import ValidationError = Error.ValidationError;
import CastError = Error.CastError;

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(
    exception: MongoServerError | ValidationError | CastError,
    host: ArgumentsHost,
  ) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    if (exception instanceof ValidationError) {
      return response.status(400).json({
        code: 400,
        errors: exception.errors,
      });
    } else if (exception instanceof CastError) {
      return response.status(400).json({
        code: 400,
        errors: exception,
      });
    } else if (exception.code === 11000) {
      return response.status(400).json({
        code: 400,
        message: `Already exist.`,
      });
    }

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseMessage = (type, message) => {
      response.status(status).json({
        code: status,
        message: message,
      });
    };

    responseMessage(exception.name, exception.message);
  }
}
