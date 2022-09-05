import { ILogFindAllParams } from './../../../models/logs/index';
import { types } from '../../types';

export const findAllLogs = (params: ILogFindAllParams) => {
  return {
    type: types.FETCHING_LOGS,
    payload: { params },
  };
};
