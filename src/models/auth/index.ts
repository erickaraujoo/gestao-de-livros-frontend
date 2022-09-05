import { IUser } from './../user/index';
import { ICompany } from './../company/index';

export interface IAuth {
  username: string;
  password: string;
}

interface IResponseAuth {
  token: string;
  users: IUser[];
  company?: ICompany;
}

interface IAuthData {
  errors: [];
  message: string;
  response: IResponseAuth;
  success: boolean;
}

export interface IAuthSelector {
  data: IAuthData;
  loading: boolean;
  success: boolean;
  error: boolean;
}

export interface AuthenticationRequestDataInterface {
  username: string;
  password: string;
}

export interface AuthenticationRequesInterface {
  payload: AuthenticationRequestDataInterface;
}
