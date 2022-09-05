import { IBlockChip } from '../../../models/chip';
import { types } from '../../types';

export const blockChips = ({ data, userId }: { data: IBlockChip; userId: number }) => {
  return {
    type: types.BLOCKING_CHIP,
    payload: { ...data },
    userId,
  };
};

export const checkConnectionChip = ({ cancelToken }: { cancelToken?: any }) => {
  return {
    type: types.CHECKING_CONNECTION_CHIP,
    cancelToken,
  };
};

export const checkOfflineConnectionChip = () => {
  return {
    type: types.CHECKING_OFFLINE_CONNECTION_CHIP,
  };
};

export const checkBlockChip = () => {
  return {
    type: types.CHECKING_BLOCK_CHIP,
  };
};
