import { IWorkshop } from './../../../models/workshop/index';
import { types } from '../../types';

export const readAsWorkshop = ({ userId }: { userId: number }) => {
  return {
    type: types.FETCHING_WORKSHOP_DATA,
    userId,
  };
};

export const writeAsWorkshop = ({ data, userId, userType }: { data: IWorkshop; userId: number; userType: string }) => {
  return {
    type: types.WRITING_WORKSHOP_DATA,
    payload: { [userType]: JSON.stringify(data) },
    userId,
  };
};
