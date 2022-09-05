import { IActionSaga, IRequestSaga } from './../../../models/sagas/index';
import { TOAST_WRITE_DATA_MESSAGE } from '../../../config/constants';
import { toast } from 'react-toastify';
import { takeLatest, all, put, call } from 'redux-saga/effects';
import { reader } from '../../../services/api';
import { types } from '../../types';
import { resolveSagaError } from './../../../utils/redux/index';

const readAsWorkshop = ({ userId }: { userId: number }): Promise<IRequestSaga> | unknown => {
  try {
    return reader.read({ userId });
  } catch (error) {
    return error;
  }
};

function* readAsWorkshopCall(actions: IActionSaga) {
  try {
    const { data }: IRequestSaga = yield call(readAsWorkshop, actions);

    yield put({
      type: types.WORKSHOP_DATA_FETCHED_SUCCESSFULLY,
      payload: { data: data.response },
    });
  } catch (error) {
    yield resolveSagaError(error);

    yield put({ type: types.FAILURE_FETCH_WORKSHOP_DATA });
  } finally {
    yield put({ type: types.FINALLY_REQUEST_WORKSHOP_DATA });
  }
}

/**
 *
 */

const writeAsWorkshop = ({ payload, userId }: { payload: object; userId: number }): Promise<IRequestSaga> | unknown => {
  try {
    return reader.record({ payload, userId });
  } catch (error) {
    return error;
  }
};

function* writeAsWorkshopCall(actions: IActionSaga) {
  try {
    const { data }: IRequestSaga = yield call(writeAsWorkshop, actions);

    yield toast.success(TOAST_WRITE_DATA_MESSAGE);

    yield put({
      type: types.WORKSHOP_DATA_WRITED_SUCCESSFULLY,
      payload: { data },
    });
  } catch (error) {
    yield resolveSagaError(error);

    yield put({ type: types.FAILURE_WRITE_WORKSHOP_DATA });
  } finally {
    yield put({ type: types.FINALLY_REQUEST_WORKSHOP_DATA });
  }
}

export function* WorkshopLatest() {
  yield all([
    takeLatest(types.WRITING_WORKSHOP_DATA, writeAsWorkshopCall),
    takeLatest(types.FETCHING_WORKSHOP_DATA, readAsWorkshopCall),
  ]);
}
