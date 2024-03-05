import { Request } from 'express';
import { UserAccessToken } from './userAccessToken';

export interface CustomRequest extends Request {
  user?: UserAccessToken;
}
