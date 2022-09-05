export interface IUserType {
  id: number;
  name: string;
  description: string;
  decryptKey: string;
  createdAt: string;
  updatedAt: string;
}

interface IUserTypeData {
  errors: [];
  message: string;
  response: IUserType | IUserType[];
  success: boolean;
}

export interface IUserTypeSelector {
  data: IUserTypeData;
  loading: boolean;
  success: boolean;
  error: boolean;
}
