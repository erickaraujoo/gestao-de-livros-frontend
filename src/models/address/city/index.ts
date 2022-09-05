import { IState } from './../state/index';
export interface ICity {
  id: string;
  name: string;
  state: IState;
  createdAt: string;
  updatedAt: string;
}

export interface IDataCity {
  errors: [];
  message: string;
  response: ICity[];
  success: boolean;
}

export interface ICitySelector {
  data: IDataCity;
  loading: boolean;
  success: boolean;
  error: boolean;
}

export const InitialCityData = {
  id: '',
  name: '',
};

export const InitialOptionsCityData = [
  {
    title: 'Selecione uma opção...',
    value: '',
  },
];
