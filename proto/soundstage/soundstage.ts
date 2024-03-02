/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';

export const protobufPackage = 'soundstage';

export interface CreateSoundStageDto {
  userId: string;
}

export interface UpdateSoundStageDto {
  userId: string;
}

export interface Empty {}

export const SOUNDSTAGE_PACKAGE_NAME = 'soundstage';

export interface SoundStageServiceClient {
  createSoundStageUser(request: CreateSoundStageDto): Observable<Empty>;
}

export interface SoundStageServiceController {
  createSoundStageUser(
    request: CreateSoundStageDto,
  ): Promise<Empty> | Observable<Empty> | Empty;
}

export function SoundStageServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['createSoundStageUser'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('SoundStageService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcStreamMethod('SoundStageService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const SOUND_STAGE_SERVICE_NAME = 'SoundStageService';
