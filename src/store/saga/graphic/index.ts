import { IRequestSaga, IActionSaga } from './../../../models/sagas/index';
import { TOAST_WRITE_DATA_MESSAGE } from './../../../config/constants';
import { takeLatest, all, put, call } from 'redux-saga/effects';
import { reader } from '../../../services/api';
import { types } from '../../types';
import { toast } from 'react-toastify';
import { resolveSagaError } from './../../../utils/redux/index';

const readAsGraphic = ({ userId }: { userId: number }): Promise<IRequestSaga> | unknown => {
  try {
    return reader.read({ userId });
  } catch (error) {
    return error;
  }
};

function* readAsGraphicCall(actions: IActionSaga) {
  try {
    const { data }: IRequestSaga = yield call(readAsGraphic, actions);

    yield put({
      type: types.GRAPHIC_DATA_FETCHED_SUCCESSFULLY,
      payload: { data },
    });
  } catch (error) {
    yield resolveSagaError(error);

    yield put({ type: types.FAILURE_FETCH_GRAPHIC_DATA });
  } finally {
    yield put({ type: types.FINALLY_REQUEST_GRAPHIC_DATA });
  }
}

/**
 *
 */

const writeAsGraphic = ({ payload, userId }: { payload: object; userId: number }): Promise<IRequestSaga> | unknown => {
  try {
    return reader.record({ payload, userId });
  } catch (error) {
    return error;
  }
};

function* writeAsGraphicCall(actions: IActionSaga) {
  try {
    const { data }: IRequestSaga = yield call(writeAsGraphic, actions);

    yield toast.success(TOAST_WRITE_DATA_MESSAGE);

    yield put({
      type: types.GRAPHIC_DATA_WRITED_SUCCESSFULLY,
      payload: { data },
    });
  } catch (error) {
    yield resolveSagaError(error);

    yield put({ type: types.FAILURE_WRITE_GRAPHIC_DATA });
  } finally {
    yield put({ type: types.FINALLY_REQUEST_GRAPHIC_DATA });
  }
}

export function* GraphicLatest() {
  yield all([takeLatest(types.WRITING_GRAPHIC_DATA, writeAsGraphicCall)]);
  yield all([takeLatest(types.FETCHING_GRAPHIC_DATA, readAsGraphicCall)]);
}
