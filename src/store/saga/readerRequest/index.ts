import { IRequestSaga, IActionSaga } from './../../../models/sagas/index';
import { TOAST_WRITE_DATA_MESSAGE, TOAST_CONECTION_REFUSED } from './../../../config/constants';
import { takeLatest, all, put, call } from 'redux-saga/effects';
import { reader } from '../../../services/api';
import { types } from '../../types';
import { toast } from 'react-toastify';
import { resolveAxiosToastError } from '../../../utils';

const readDataFromTheChip = ({ userId }: { userId: number }): Promise<IRequestSaga> | unknown => {
  try {
    return reader.read({ userId });
  } catch (error) {
    return error;
  }
};

function* readDataFromTheChipCall(actions: IActionSaga) {
  try {
    const { data }: IRequestSaga = yield call(readDataFromTheChip, actions);

    yield put({
      type: types.CHIP_DATA_READ_SUCCESSFULLY,
      payload: { data },
    });
  } catch ({ response }) {
    yield resolveAxiosToastError(response);

    yield put({ type: types.FAILURE_READ_DATA_FROM_CHIP, payload: { data: response.data } });
  } finally {
    yield put({ type: types.FINALLY_READ_DATA_FROM_THE_CHIP });
  }
}

/**
 *
 */

const readOfflineDataFromTheChip = () => {
  try {
    return reader.offlineRead();
  } catch (error) {
    return error;
  }
};

function* readOfflineDataFromTheChipCall() {
  try {
    const { data }: IRequestSaga = yield call(readOfflineDataFromTheChip);

    yield put({
      type: types.OFFLINE_CHIP_DATA_READ_SUCCESSFULLY,
      payload: { data },
    });
  } catch ({ response }) {
    if (response && response.data.message) yield toast.error(response.data.message);
    else yield toast.error(TOAST_CONECTION_REFUSED);

    yield put({ type: types.FAILURE_READ_OFFLINE_DATA_FROM_CHIP });
  } finally {
    yield put({ type: types.FINALLY_READ_OFFLINE_DATA_FROM_THE_CHIP });
  }
}

/**
 *
 */

const recordDataOnTheChip = ({ payload, userId }: { payload: object; userId: number }): Promise<IRequestSaga> => {
  try {
    return reader.record({ payload, userId });
  } catch (err) {
    return err;
  }
};

function* recordDataOnTheChipCall(actions: IActionSaga) {
  try {
    const { data }: IRequestSaga = yield call(recordDataOnTheChip, actions);

    yield toast.success(TOAST_WRITE_DATA_MESSAGE);

    yield put({
      type: types.DATA_SUCCESSFULLY_RECORDED_ON_THE_CHIP,
      payload: { data },
    });
  } catch ({ response }) {
    yield resolveAxiosToastError(response);

    yield put({ type: types.FAILURE_RECORD_DATA_ON_THE_CHIP, payload: { data: response.data } });
  } finally {
    yield put({ type: types.FINALLY_RECORD_DATA_ON_THE_CHIP });
  }
}

export function* ReaderRequestLatest() {
  yield all([takeLatest(types.RECORDING_DATA_ON_THE_CHIP, recordDataOnTheChipCall)]);
  yield all([takeLatest(types.READING_DATA_FROM_CHIP, readDataFromTheChipCall)]);
  yield all([takeLatest(types.READING_OFFLINE_DATA_FROM_CHIP, readOfflineDataFromTheChipCall)]);
}
