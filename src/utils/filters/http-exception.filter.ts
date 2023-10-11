import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Logger } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    // Log the error
    this.logger.error(exception.message, exception.stack);

    const errorResponse = {
      statusCode: status,
      message: process.env.NODE_ENV === 'production' ? 'An error occurred' : exception.message,
      ...(process.env.NODE_ENV !== 'production' && { stack: exception.stack }),
      timestamp: new Date().toISOString(),
    };

    response.status(status).json(errorResponse);
  }
}
