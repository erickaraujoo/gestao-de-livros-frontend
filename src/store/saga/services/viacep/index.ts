import { types } from '../../../types';
import { takeLatest, put, all, call } from 'redux-saga/effects';
import { IActionSaga } from '../../../../models/sagas';
import { toast } from 'react-toastify';
import { address } from '../../../../services/viacep';
import { formattedAddressViacepByZipCode } from '../../../../utils/formatters/address';
import { IRequestSagaViacepAddressByZipCode } from '../../../../models/services/viacep';
import { resolveSagaError } from './../../../../utils/redux/index';

const fetchAddressByZipCode = ({ payload }: { payload: object }) => {
  const zipCode = Object.values(payload)[0];

  try {
    return address.fetchAddressByZipCode({ zipCode });
  } catch (error) {
    return error;
  }
};

function* fetchAddressByZipCodeCall(actions: IActionSaga) {
  try {
    const { data }: IRequestSagaViacepAddressByZipCode = yield call(fetchAddressByZipCode, actions);

    const error = Object.keys(data).find((value) => value === 'erro') || null;

    if (!Object.keys(data).length || error) {
      yield put({ type: types.VIACEP_ADDRESS_BY_ZIPCODE_FETCH_SUCCESSFULLY, payload: { data: [] } });

      toast.warning('Cep não encontrado! Verifique-o antes de continuar');

      return;
    }

    const formattedData = formattedAddressViacepByZipCode(data);

    yield put({ type: types.VIACEP_ADDRESS_BY_ZIPCODE_FETCH_SUCCESSFULLY, payload: { data: formattedData } });
  } catch (error) {
    yield resolveSagaError(error);

    yield put({ type: types.FAILURE_FETCH_VIACEP_ADDRESS_BY_ZIPCODE });
  } finally {
    yield put({ type: types.FINALLY_REQUEST_VIACEP_ADDRESS_BY_ZIPCODE });
  }
}

export function* ViacepAddressLatest() {
  yield all([takeLatest(types.FETCHING_VIACEP_ADDRESS_BY_ZIPCODE, fetchAddressByZipCodeCall)]);
}
