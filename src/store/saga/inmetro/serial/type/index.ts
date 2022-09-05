import { all, put, call, takeLatest } from 'redux-saga/effects';
import { IRequestSaga } from '../../../../../models/sagas';
import { inmetroSerialType } from '../../../../../services/api';
import { types } from '../../../../types';
import { resolveSagaError } from './../../../../../utils/redux/index';

const findAllData = (): Promise<IRequestSaga> | unknown => {
  try {
    return inmetroSerialType.findAll();
  } catch (error) {
    return error;
  }
};

function* findAllCall() {
  try {
    const { data } = yield call(findAllData);

    yield put({ type: types.INMETRO.SERIAL.TYPE.SUCCESS, payload: { data } });
  } catch (error) {
    yield resolveSagaError(error);

    yield put({ type: types.INMETRO.SERIAL.TYPE.FAILURE });
  } finally {
    yield put({ type: types.INMETRO.SERIAL.TYPE.FINALLY });
  }
}

export function* InmetroSerialTypeLatest() {
  yield all([takeLatest(types.INMETRO.SERIAL.TYPE.REQUEST, findAllCall)]);
}
