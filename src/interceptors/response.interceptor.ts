import { ApiResponse, createApiResponse } from './api-response';
import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Response } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, ApiResponse<T>>
{
  public intercept(
    ctx: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiResponse<T>> {
    const { statusCode } = ctx.switchToHttp().getResponse<Response>();

    return next.handle().pipe(
      map(data =>
        createApiResponse({
          payload: data,
          message: HttpStatus[statusCode],
          status: statusCode,
        }),
      ),
    );
  }
}
