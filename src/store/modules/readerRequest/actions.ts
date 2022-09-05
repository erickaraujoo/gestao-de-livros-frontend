import { types } from '../../types';
import { IReaderRequest } from './../../../models/readerRequest/index';

export const readDataFromTheChip = ({ userId }: { userId: number }) => {
  return {
    type: types.READING_DATA_FROM_CHIP,
    userId,
  };
};

export const readOfflineDataFromTheChip = () => {
  return {
    type: types.READING_OFFLINE_DATA_FROM_CHIP,
  };
};

export const recordDataOnTheChip = ({
  data,
  userId,
  userType,
}: {
  data: IReaderRequest;
  userId: number;
  userType: string;
}) => {
  return {
    type: types.RECORDING_DATA_ON_THE_CHIP,
    payload: { [userType]: data.graphic ? JSON.stringify(data.graphic) : JSON.stringify(data.workshop) },
    userId,
  };
};
