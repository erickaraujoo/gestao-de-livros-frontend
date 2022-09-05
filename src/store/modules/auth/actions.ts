import { IAuth } from './../../../models/auth/index';
import { types } from '../../types';

export const userAuthentication = (data: IAuth) => {
  return {
    type: types.FETCHING_USER_DATA,
    payload: data,
  };
};

export const internalUserAuthentication = (data: IAuth) => {
  return {
    type: types.FETCHING_INTERNAL_USER_DATA,
    payload: data,
  };
};

export const clearReduxAuthData = () => {
  return {
    type: types.CLEARING_REDUX_AUTH_DATA,
  };
};
