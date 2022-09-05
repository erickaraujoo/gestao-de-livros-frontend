import { IPageableResponse } from '../services/api';
import { IUser } from './../user/index';

export interface ILog {
  id: number;
  request: string;
  response: string;
  method: string;
  route: string;
  statusCode: string;
  statusText: string;
  createdAt: string;
  updatedAt: string;
  user: IUser;
}

export interface IPageableResponseLog extends IPageableResponse {
  content: ILog | ILog[];
}

interface ILogData {
  errors: [];
  message: string;
  response: IPageableResponseLog | ILog | ILog[];
  success: boolean;
}

export interface ILogSelector {
  data: ILogData;
  loading: boolean;
  success: boolean;
  error: boolean;
}

export const InitialLogData = {
  id: null,
  request: null,
  response: null,
  method: null,
  route: null,
  statusCode: null,
  statusText: null,
  createdAt: null,
  updatedAt: null,
  user: [],
};

/**
 *
 */

export interface ILogFindAllParams {
  page: number;
  size: number;
  sort: string | number;
}
