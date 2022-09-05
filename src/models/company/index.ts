import { IPageableResponse } from './../services/api/index';
import { IUser } from './../user/index';
import { IAddress } from './../address/index';

export interface ICompany {
  id: number;
  cnpj: string;
  name: string;
  stateRegistration: string;
  itlRegister?: string;
  users: IUser[];
  validation: any;
  address: IAddress;
  createdAt: string;
  updatedAt: string;
  finishedAt: string;
}

export interface ICreateCompany {
  cnpj: string;
  name: string;
  phone: string;
  itlRegister?: string;
  zipCode: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
}

export interface IUpdateCompany {
  cnpj: string;
  name: string;
  stateRegistration: string;
  itlRegister?: string;
}

interface ICompanyErrors {
  cnpj: string;
}

export interface IPageableCompanyResponse extends IPageableResponse {
  content: ICompany | ICompany[];
}

interface ICompanyData {
  errors: ICompanyErrors | [];
  message: string;
  response: IPageableCompanyResponse | ICompany | ICompany[];
  success: boolean;
}

export interface ICompanySelector {
  data: ICompanyData;
  loading: boolean;
  success: boolean;
  error: boolean;
}

export const InitialCompanyData: ICreateCompany = {
  cnpj: '',
  name: '',
  phone: '',
  zipCode: '',
  street: '',
  number: '',
  neighborhood: '',
  city: '',
  state: '',
};
