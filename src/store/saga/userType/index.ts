import { all, call, put, takeLatest } from '@redux-saga/core/effects';
import { userType } from '../../../services/api';
import { types } from '../../types';
import { resolveSagaError } from './../../../utils/redux/index';
import { IRequestSaga } from '../../../models/sagas';

const findToCreate = () => {
  try {
    return userType.findToCrate();
  } catch (error) {
    return error;
  }
};

function* findToCreateCall(): Promise<IRequestSaga> | unknown {
  try {
    const { data }: IRequestSaga = yield call(findToCreate);

    yield put({
      type: types.USER_TYPES_FETCH_SUCCESSFULLY,
      payload: { data },
    });
  } catch (error) {
    yield resolveSagaError(error);

    yield put({ type: types.FAILURE_FETCH_USER_TYPES });
  } finally {
    yield put({ type: types.FINALLY_REQUEST_USER_TYPES });
  }
}

export function* UserTypeLatest() {
  yield all([takeLatest(types.FETCHING_USER_TYPES, findToCreateCall)]);
}
