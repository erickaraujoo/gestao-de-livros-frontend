import { IActionSaga, IRequestSaga } from '../../../models/sagas';
import { toast } from 'react-toastify';
import { all, call } from 'redux-saga/effects';
import { put } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga/effects';
import { chip } from '../../../services/api';
import { types } from '../../types';
import { resolveAxiosToastError } from '../../../utils';

const checkConnectionChip = ({ cancelToken }: IActionSaga) => {
  try {
    return chip.checkConnectionChip({ cancelToken });
  } catch (error) {
    return error;
  }
};

function* checkConnectionChipCall(actions: IActionSaga) {
  try {
    const { data }: IRequestSaga = yield call(checkConnectionChip, actions);

    yield put({
      type: types.CHIP_SUCCESSFULLY_CONNECTION_CHECKED,
      payload: data,
    });
  } catch ({ response }) {
    yield resolveAxiosToastError(response);

    yield response && response.data
      ? put({ type: types.FAILURE_CHECK_CONNECTION_CHIP, payload: { data: response.data } })
      : put({ type: types.FAILURE_CHECK_CONNECTION_CHIP });
  } finally {
    yield put({ type: types.FINALLY_REQUEST_CHECK_CONNECTION_CHIP });
  }
}

/**
 *
 */

const checkOfflineConnectionChip = () => {
  try {
    return chip.checkOfflineConnectionChip();
  } catch (error) {
    return error;
  }
};

function* checkOfflineConnectionChipCall() {
  try {
    const { data }: IRequestSaga = yield call(checkOfflineConnectionChip);

    yield put({
      type: types.CHIP_SUCCESSFULLY_OFFLINE_CONNECTION_CHECKED,
      payload: data,
    });
  } catch ({ response }) {
    yield resolveAxiosToastError(response);

    yield put({ type: types.FAILURE_CHECK_OFFLINE_CONNECTION_CHIP, payload: { data: response.data } });
  } finally {
    yield put({ type: types.FINALLY_REQUEST_CHECK_OFFLINE_CONNECTION_CHIP });
  }
}

/**
 *
 */

const checkBlockChip = (): Promise<IRequestSaga> => {
  try {
    return chip.checkBlockChip();
  } catch (error) {
    return error;
  }
};

function* checkBlockChipCall() {
  try {
    const { status, data }: IRequestSaga = yield call(checkBlockChip);

    if (status === 401) yield toast.error(data.message);

    yield put({
      type: types.CHIP_SUCCESSFULLY_BLOCK_CHECKED,
      payload: data,
    });
  } catch ({ response }) {
    yield resolveAxiosToastError(response);

    yield put({ type: types.FAILURE_CHECK_BLOCK_CHIP, payload: { data: response.data } });
  } finally {
    yield put({ type: types.FINALLY_REQUEST_CHECK_BLOCK_CHIP });
  }
}

/**
 *
 */

const blockChips = ({ payload, userId }: { payload: object; userId: number }): Promise<IRequestSaga> => {
  try {
    return chip.blockChips({ payload, userId });
  } catch (error) {
    return error;
  }
};

function* blockChipCall(actions: IActionSaga) {
  try {
    const { data }: IRequestSaga = yield call(blockChips, actions);

    yield toast.success('Selo(s) bloqueado(s) com sucesso');

    yield put({
      type: types.CHIP_SUCCESSFULLY_BLOCKED,
      payload: { data: data.response },
    });
  } catch ({ response }) {
    yield resolveAxiosToastError(response);

    yield put({ type: types.FAILURE_BLOCK_CHIP, payload: { data: response.data } });
  } finally {
    yield put({ type: types.FINALLY_REQUEST_BLOCK_CHIP });
  }
}

export function* ChipLatest() {
  yield all([
    takeLatest(types.BLOCKING_CHIP, blockChipCall),
    takeLatest(types.CHECKING_CONNECTION_CHIP, checkConnectionChipCall),
    takeLatest(types.CHECKING_OFFLINE_CONNECTION_CHIP, checkOfflineConnectionChipCall),
    takeLatest(types.CHECKING_BLOCK_CHIP, checkBlockChipCall),
  ]);
}
