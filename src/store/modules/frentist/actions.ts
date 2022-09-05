import { types } from './../../types';

export const getExpirationDataToGenerateSpreadsheet = ({ userId }: { userId: number }) => {
  return {
    type: types.GENERATING_SPREADSHEET_VALIDATION_DATA_FILLING_STATION,
    userId,
  };
};

export const decrypDataReadingFillingStation = (data: any) => {
  return {
    type: types.DECRYPTING_DATA_READING_FILLING_STATION,
    payload: data,
  };
};
