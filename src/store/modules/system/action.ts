import { types } from './../../types';

export const restartSystem = () => {
  return {
    type: types.SYSTEM.RESTART.REQUEST,
  };
};
