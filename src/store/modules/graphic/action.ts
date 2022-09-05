import { IGraphic } from './../../../models/graphic/index';
import { types } from '../../types';

export const readAsGraphic = ({ userId }: { userId: number }) => {
  return {
    type: types.FETCHING_GRAPHIC_DATA,
    userId,
  };
};

export const writeAsGraphic = ({ data, userId, userType }: { data: IGraphic; userId: number; userType: string }) => {
  return {
    type: types.WRITING_GRAPHIC_DATA,
    payload: { [userType]: JSON.stringify(data) },
    userId,
  };
};
