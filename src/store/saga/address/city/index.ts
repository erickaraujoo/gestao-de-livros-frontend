import { all, call, put, takeLatest } from '@redux-saga/core/effects';
import { IActionSaga, IRequestSaga } from '../../../../models/sagas';
import { address } from '../../../../services/api';
import { types } from '../../../types';
import { resolveSagaError } from './../../../../utils/redux/index';

const fetchCitiesByState = ({ payload }: { payload: object }): Promise<IRequestSaga> | unknown => {
  const stateId = Object.values(payload)[0];

  try {
    return address.findCitiesByState({ stateId });
  } catch (error) {
    return error;
  }
};

function* fetchCitiesByStateCall(actions: IActionSaga) {
  try {
    const { data }: IRequestSaga = yield call(fetchCitiesByState, actions);

    yield put({
      type: types.CITIES_BY_STATE_FETCH_SUCCESSFULLY,
      payload: { data },
    });
  } catch (error) {
    yield resolveSagaError(error);

    yield put({ type: types.FAILURE_FETCH_CITIES_BY_STATE });
  } finally {
    yield put({ type: types.FINALLY_REQUEST_CITIES_BY_STATE });
  }
}

export function* CityLatest() {
  yield all([takeLatest(types.FETCHING_CITIES_BY_STATE, fetchCitiesByStateCall)]);
}
