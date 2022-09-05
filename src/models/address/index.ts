import { ICity } from './city/index';

export interface IAddress {
  id: string;
  zipCode: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  description: string;
  city: ICity;
  createdAt: string;
  updatedAt: string;
  finishedAt: string;
}

export interface IUpdateAddress {
  zipCode: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  description: string;
  city: ICity;
  createdAt: string;
  updatedAt: string;
  finishedAt: string;
}
