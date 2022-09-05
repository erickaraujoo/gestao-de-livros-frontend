import { all, put, takeLatest, call } from '@redux-saga/core/effects';
import { types } from '../../../types';
import { IRequestSaga } from '../../../../models/sagas/index';
import { address } from '../../../../services/api';
import { resolveSagaError } from './../../../../utils/redux/index';

const fetchStates = (): Promise<IRequestSaga> | unknown => {
  try {
    return address.findStates();
  } catch (error) {
    return error;
  }
};

function* fetchStatesCall() {
  try {
    const { data }: IRequestSaga = yield call(fetchStates);

    yield put({ type: types.STATES_FETCH_SUCCESSFULLY, payload: { data } });
  } catch (error) {
    yield resolveSagaError(error);

    yield put({ type: types.FAILURE_FETCH_STATES });
  } finally {
    yield put({ type: types.FINALLY_REQUEST_STATES });
  }
}

export function* StateLatest() {
  yield all([takeLatest(types.FETCHING_STATES, fetchStatesCall)]);
}
