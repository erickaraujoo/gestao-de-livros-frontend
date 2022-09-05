import { types } from '../../types';

export const readAsInspector = ({ userId }: { userId: number }) => {
  return {
    type: types.FETCHING_INSPECTOR_DATA,
    userId,
  };
};
