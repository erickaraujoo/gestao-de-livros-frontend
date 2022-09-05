import { all, takeLatest, call, put } from 'redux-saga/effects';
import { system } from '../../../services/api';
import { resolveSagaError } from '../../../utils/redux';
import { types } from '../../types';

const restartSystemData = () => {
  try {
    return system.restartSystem();
  } catch (error) {
    return error;
  }
};

function* restartSystemCall() {
  try {
    const { data } = yield call(restartSystemData);

    yield put({ type: types.SYSTEM.RESTART.SUCCESS, payload: { data } });
  } catch (error) {
    resolveSagaError(error);

    yield put({ type: types.SYSTEM.RESTART.FAILURE });
  } finally {
    yield put({ type: types.SYSTEM.RESTART.FINALLY });
  }
}

export function* SystemLatest() {
  yield all([takeLatest(types.SYSTEM.RESTART.REQUEST, restartSystemCall)]);
}
