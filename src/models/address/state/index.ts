export interface IState {
  id: number;
  name: string;
  uf: string;
  createdAt: string;
  updatedAt: string;
}

export interface IDataState {
  errors: [];
  message: string;
  response: IState[];
  success: boolean;
}

export interface IStateSelector {
  data: IDataState;
  loading: boolean;
  success: boolean;
  error: boolean;
}