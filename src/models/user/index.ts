import { IUserType } from '../userType';

export interface IUser {
  id: number;
  username: string;
  usernameconfirmation?: string;
  name: string;
  password?: string;
  passwordConfirmation?: string;
  createdAt: string;
  updatedAt: string;
  finishedAt?: string;
  userType: IUserType;
  currentLogged?: boolean;
}

interface IUserErrors {
  username: string;
}

export interface IUserData {
  errors: IUserErrors | [];
  message: string;
  response: IUser | IUser[];
  success: boolean;
}

export interface IUserSelector {
  data: IUserData;
  loading: boolean;
  success: boolean;
  error: boolean;
}

export interface ICreateUser {
  name: string;
  username: string;
  password: string;
  passwordConfirmation?: string;
  userType: {};
}

export const InitialUserTypeData = {
  name: '',
};

export const InitialStringifyUserData = JSON.stringify({
  id: '',
  username: '',
  name: '',
  createdAt: '',
  updatedAt: '',
  userType: InitialUserTypeData,
});

export const InitialUserData: ICreateUser = {
  name: '',
  username: '',
  password: '',
  userType: {},
};
