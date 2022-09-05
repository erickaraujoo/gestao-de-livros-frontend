import { IChip } from './../chip/index';
export interface IFrentist {
  expirationDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface IExpirationDateFrentist {
  uid: string;
  chip?: IChip;
  expirationDate: string;
}

interface IFrentistData {
  errors: [];
  message: string;
  response: string | IExpirationDateFrentist[];
  success: boolean;
}

export interface IFrentistSelector {
  data: IFrentistData;
  loading: boolean;
  success: boolean;
  error: boolean;
}
