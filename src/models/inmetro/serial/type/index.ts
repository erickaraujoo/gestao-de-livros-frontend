export interface IInmetroSerialType {
  name: string;
  value: string;
  createdAt: string;
  updatedAt: string;
}

export interface IInmetroSerialTypeData {
  errors: [];
  message: string;
  response: IInmetroSerialType[];
  success: boolean;
}

export interface IInmetroSerialTypeSelector {
  data: IInmetroSerialTypeData;
  loading: boolean;
  success: boolean;
  error: boolean;
}
