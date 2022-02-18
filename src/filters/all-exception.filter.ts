import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

import { createApiResponse } from '../interceptors/api-response';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let message: string;
    let status: number;
    if (
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      exception.status &&
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      exception.status !== HttpStatus.INTERNAL_SERVER_ERROR
    ) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const exceptionResponse = exception.getResponse() as {
        message: string | string[];
        statusCode: number;
      };

      message = Array.isArray(exceptionResponse.message)
        ? exceptionResponse.message[0]
        : exceptionResponse.message;
      status = exceptionResponse.statusCode;
    } else {
      message = 'Internal server error';
      status = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    response.status(status).json(
      createApiResponse({
        status,
        message,
        payload: null,
      }),
    );
  }
}
