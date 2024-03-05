import { map, Observable } from 'rxjs';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Response } from '../interfaces/customResponse';
import { ResponseMessage } from '../constants/response/message';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response> {
  constructor(private readonly reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<Response> {
    return next
      .handle()
      .pipe(map((data) => this.createSuccessfulResponse(context, data)));
  }
  private createSuccessfulResponse(
    context: ExecutionContext,
    data: any,
  ): Response {
    return {
      success: true,
      statusCode: context.switchToHttp().getResponse().statusCode,
      message:
        this.getMessageFromHandler(context) ||
        (data && data.message) ||
        ResponseMessage.SUCCESS,
      data: data?.result || data,
    };
  }
  private getMessageFromHandler(context: ExecutionContext): string {
    return this.reflector.get<string>('response_message', context.getHandler());
  }
}
