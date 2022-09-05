import { IGraphic } from '../graphic';
import { IWorkshop } from '../workshop';
import { IFrentist } from './../frentist/index';

export interface IReaderRequest {
  graphic?: IGraphic | string;
  workshop?: IWorkshop | string;
  frentist?: IFrentist | string;
}

export interface IReaderRequestData {
  errors: [];
  message: string;
  response: IReaderRequest;
  success: boolean;
}

export interface IReaderRequestSelector {
  data: IReaderRequestData;
  loading: boolean;
  success: boolean;
  error: boolean;
  errorType?: string;
}
