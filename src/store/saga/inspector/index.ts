import { IActionSaga, IRequestSaga } from './../../../models/sagas/index';
import { all, call, put, takeLatest } from '@redux-saga/core/effects';
import { types } from '../../types';
import { reader } from '../../../services/api';
import { resolveSagaError } from './../../../utils/redux/index';

const readAsInspector = ({ userId }: { userId: number }): Promise<IRequestSaga> | unknown => {
  try {
    return reader.read({ userId });
  } catch (error) {
    return error;
  }
};

function* readAsInspectorCall(actions: IActionSaga) {
  try {
    const { data }: IRequestSaga = yield call(readAsInspector, actions);

    yield put({
      type: types.INSPECTOR_DATA_FETCHED_SUCCESSFULLY,
      payload: { data: data.response },
    });
  } catch (error) {
    yield resolveSagaError(error);

    yield put({ type: types.FAILURE_FETCH_INSPECTOR_DATA });
  } finally {
    yield put({ type: types.FINALLY_REQUEST_INSPECTOR_DATA });
  }
}

export function* InspectorLatest() {
  yield all([takeLatest(types.FETCHING_INSPECTOR_DATA, readAsInspectorCall)]);
}
