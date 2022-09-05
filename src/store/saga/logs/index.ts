import { IActionSaga, IRequestSaga } from './../../../models/sagas/index';
import { all, call, put } from '@redux-saga/core/effects';
import { takeLatest } from '@redux-saga/core/effects';
import { logs } from '../../../services/api';
import { types } from '../../types';
import { resolveSagaError } from './../../../utils/redux/index';

const findAll = ({ payload }: { payload: object }): Promise<IRequestSaga> | unknown => {
  try {
    return logs.findAll({ payload });
  } catch (error) {
    return error;
  }
};

function* findAllCall(actions: IActionSaga) {
  try {
    const { data }: IRequestSaga = yield call(findAll, actions);

    yield put({
      type: types.LOGS_FETCHED_SUCCESSFULLY,
      payload: { data },
    });
  } catch (error) {
    yield resolveSagaError(error);

    yield put({ type: types.FAILURE_FETCH_LOGS });
  } finally {
    yield put({ type: types.FINALLY_REQUEST_LOGS });
  }
}

export function* LogsLatest() {
  yield all([takeLatest(types.FETCHING_LOGS, findAllCall)]);
}
