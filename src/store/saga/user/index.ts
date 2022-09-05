import { all, call, put, takeLatest } from '@redux-saga/core/effects';
import { IActionSaga } from '../../../models/sagas';
import { user } from '../../../services/api';
import { types } from '../../types';

const validateEmailToRegister = ({ payload }: { payload: object }) => {
  const email = Object.values(payload)[0];

  try {
    return user.validateEmailToRegister({ email });
  } catch (error) {
    return error;
  }
};

function* validateEmailToRegisterCall(actions: IActionSaga) {
  try {
    const { data } = yield call(validateEmailToRegister, actions);

    yield put({ type: types.USER_BY_EMAIL_FETCH_SUCCESSFULLY, payload: { data } });
  } catch ({ response }) {
    const { data } = response;

    if (Object.keys(data.errors).length) yield put({ type: types.FAILURE_FETCH_USER_BY_EMAIL, payload: { data } });
  } finally {
    yield put({ type: types.FINALLY_REQUEST_USER_BY_EMAIL });
  }
}

export function* UserLatest() {
  yield all([takeLatest(types.FETCHING_USER_BY_EMAIL, validateEmailToRegisterCall)]);
}
