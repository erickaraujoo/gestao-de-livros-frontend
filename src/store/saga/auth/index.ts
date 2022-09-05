import { IActionSaga, IRequestSaga } from '../../../models/sagas';
import { takeLatest } from 'redux-saga/effects';
import { all, put, call } from '@redux-saga/core/effects';
import { types } from '../../types';
import { auth } from '../../../services/api';
import { resolveSagaError } from './../../../utils/redux/index';

function* clearReduxAuthDataCall() {
  try {
    yield put({ type: types.REDUX_AUTH_DATA_CLEARED_SUCCESSFULLY, payload: { data: {} } });
  } catch (error) {
    yield resolveSagaError(error);

    yield put({ type: types.FAILURE_CLEAR_REDUX_AUTH_DATA });
  } finally {
    yield put({ type: types.FINALLY_CLEAR_REDUX_AUTH_DATA });
  }
}

/**
 *
 */

const fetchInternalUser = ({ payload }: { payload: object }): Promise<IRequestSaga> | unknown => {
  try {
    return auth.internalUserAuthentication({ payload });
  } catch (error) {
    return error;
  }
};

function* fetchInternalUserCall(actions: IActionSaga) {
  try {
    const { data }: IRequestSaga = yield call(fetchInternalUser, actions);

    yield put({
      type: types.INTERNAL_USER_DATA_FETCH_SUCCESSFULLY,
      payload: { data },
    });
  } catch (error) {
    yield resolveSagaError(error);

    yield put({ type: types.FAILURE_FETCH_INTERNAL_USER_DATA });
  } finally {
    yield put({ type: types.FINALLY_REQUEST_INTERNAL_USER_DATA });
  }
}

/**
 *
 */

const fetchUser = ({ payload }: { payload: object }): Promise<IRequestSaga> | unknown => {
  try {
    return auth.userAuthenctication({ payload });
  } catch (error) {
    return error;
  }
};

function* fetchUserCall(actions: IActionSaga) {
  try {
    const { data }: IRequestSaga = yield call(fetchUser, actions);

    yield put({
      type: types.USER_DATA_FETCH_SUCCESSFULLY,
      payload: { data },
    });
  } catch (error) {
    yield resolveSagaError(error);

    yield put({ type: types.FAILURE_FETCH_USER_DATA });
  } finally {
    yield put({ type: types.FINALLY_REQUEST_USER_DATA });
  }
}

export function* AuthLatest() {
  yield all([
    takeLatest(types.FETCHING_USER_DATA, fetchUserCall),
    takeLatest(types.FETCHING_INTERNAL_USER_DATA, fetchInternalUserCall),
    takeLatest(types.CLEARING_REDUX_AUTH_DATA, clearReduxAuthDataCall),
  ]);
}
