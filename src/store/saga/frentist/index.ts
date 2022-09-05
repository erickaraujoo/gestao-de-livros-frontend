import { all } from '@redux-saga/core/effects';
import { takeLatest, put, call } from 'redux-saga/effects';
import { IActionSaga } from '../../../models/sagas';
import { frentist } from '../../../services/api';
import { types } from './../../types';
import { IRequestSaga } from './../../../models/sagas/index';
import { resolveSagaError } from './../../../utils/redux/index';

const getExpirationDataToGenerateSpreadsheet = (): Promise<IRequestSaga> | unknown => {
  try {
    return frentist.getExpirationDataToGenerateSpreadsheet();
  } catch (error) {
    return error;
  }
};

function* getExpirationDataToGenerateSpreadsheetCall(actions: IActionSaga) {
  try {
    const { data } = yield call(getExpirationDataToGenerateSpreadsheet);

    yield put({ type: types.SPREADSHEET_VALIDATION_DATA_FILLING_STATION_GENERATE_SUCCESSFULLY, payload: { data } });
  } catch (error) {
    yield resolveSagaError(error);

    yield put({ type: types.FAILURE_GENERATE_SPREADSHEET_VALIDATION_DATA_FILLING_STATION });
  } finally {
    yield put({ type: types.FINALLY_GENERATE_SPREADSHEET_VALIDATION_DATA_FILLING_STATION });
  }
}

/**
 *
 */

const decrypDataReadingFillingStation = ({ payload }: { payload: object }) => {
  try {
    return frentist.decrypDataReadingFillingStation({ payload });
  } catch (error) {
    return error;
  }
};

function* decrypDataReadingFillingStationCall(actions: IActionSaga) {
  try {
    const { data } = yield call(decrypDataReadingFillingStation, actions);

    yield put({ type: types.DATA_READING_FILLING_STATION_DECRYPTED_SUCCESSFULLY, payload: { data } });
  } catch (error) {
    yield resolveSagaError(error);

    yield put({ type: types.FAILURE_DECRYPT_DATA_READING_FILLING_STATION });
  } finally {
    yield put({ type: types.FINALLY_DECRYPT_READING_DATA_FILLING_STATION });
  }
}

export function* FrentistLatest() {
  yield all([
    takeLatest(
      types.GENERATING_SPREADSHEET_VALIDATION_DATA_FILLING_STATION,
      getExpirationDataToGenerateSpreadsheetCall,
    ),
    takeLatest(types.DECRYPTING_DATA_READING_FILLING_STATION, decrypDataReadingFillingStationCall),
  ]);
}
