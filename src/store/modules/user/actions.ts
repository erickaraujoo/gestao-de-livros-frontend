import { types } from '../../types';

export const validateEmailToRegister = (email: string) => {
  return {
    type: types.FETCHING_USER_BY_EMAIL,
    payload: { email },
  };
};
