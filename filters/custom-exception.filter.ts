import { Request, Response } from 'express';
import { ResponseMessage } from '../constants/response/message';
import { StatusCode } from '../constants/response/statusCode';
import { Response as IResponse } from '../interfaces/customResponse';
import { QueryFailedError } from 'typeorm';
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

@Catch(Error)
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.status || StatusCode.INTERNAL_SERVER_ERROR;
    const errorResponse: IResponse = {
      success: false,
      statusCode: status,
      message:
        this.getMessageFromError(exception) ||
        exception.message ||
        ResponseMessage.UNEXPECTED,
      errorData: {
        timestamp: new Date().toISOString(),
        route: request.path,
        method: request.method,
        name:
          exception.response && exception.response.name
            ? exception.response.name
            : exception.name,
        detail: {},
      },
    };
    if (exception instanceof QueryFailedError) {
      errorResponse.errorData.detail = {
        parameters: exception.parameters,
        info: exception.driverError['detail'],
      };
    } else if (
      exception.response &&
      exception.response.hasOwnProperty('property')
    ) {
      errorResponse.errorData.detail = {
        ...exception.response,
      };
    } else {
      if (!(exception instanceof Error)) {
        errorResponse.errorData.detail = {
          property: exception.response.error,
        };
      }
    }
    response.status(status).json(errorResponse);
  }
  private getMessageFromError(error: any): string {
    return (
      (error.response &&
        error.response.constraint &&
        error.response.constraint[Object.keys(error.response.constraint)[0]]) ||
      error.message
    );
  }
}
