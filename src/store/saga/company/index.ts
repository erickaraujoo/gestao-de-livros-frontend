import { all, call, put, takeLatest } from '@redux-saga/core/effects';
import { IActionSaga, IRequestSaga } from '../../../models/sagas';
import { company } from '../../../services/api';
import { types } from '../../types';
import { toast } from 'react-toastify';
import { TOAST_REGISTER_MESSAGE } from '../../../config/constants';
import { resolveSagaError } from './../../../utils/redux/index';

const createCompany = ({ payload }: { payload: object }) => {
  try {
    return company.create({ payload });
  } catch (error) {
    return error;
  }
};

function* createCompanyCall(actions: IActionSaga) {
  try {
    const { data } = yield call(createCompany, actions);

    yield toast.success(TOAST_REGISTER_MESSAGE('Empresa'));

    yield put({ type: types.COMPANY_CREATED_SUCCESSFULLY, payload: { data } });
  } catch (error) {
    yield resolveSagaError(error);

    yield put({ type: types.FAILURE_CREATE_COMPANY });
  } finally {
    yield put({ type: types.FINALLY_CREATE_COMPANY });
  }
}

/**
 *
 */

const validateCompanyCnpjToRegister = ({ payload }: { payload: object }) => {
  const cnpj = Object.values(payload)[0];

  try {
    return company.validateCompanyCnpjToRegister({ cnpj });
  } catch (error) {
    return error;
  }
};

function* validateCompanyCnpjToRegisterCall(actions: IActionSaga) {
  try {
    const { data } = yield call(validateCompanyCnpjToRegister, actions);

    yield put({ type: types.COMPANY_BY_CNPJ_FETCH_SUCCESSFULLY, payload: { data } });
  } catch ({ response }) {
    const { data } = response;

    if (Object.keys(data.errors).length) yield put({ type: types.FAILURE_FETCH_COMPANY_BY_CNPJ, payload: { data } });
  } finally {
    yield put({ type: types.FINALLY_REQUEST_COMPANY_BY_CNPJ });
  }
}

/**
 *
 */

const findAllCompaniesNonValidated = ({ payload }: { payload: object }): Promise<IRequestSaga> | unknown => {
  try {
    return company.findAllCompaniesNonValidated({ payload });
  } catch (error) {
    return error;
  }
};

function* findAllCompaniesNonValidatedCall(actions: IActionSaga) {
  try {
    const { data }: IRequestSaga = yield call(findAllCompaniesNonValidated, actions);

    yield put({ type: types.COMPANIES_NON_VALIDATED_FETCH_SUCCESSFULLY, payload: { data } });
  } catch (error) {
    yield resolveSagaError(error);

    yield put({ type: types.FAILURE_FETCH_COMPANIES_NON_VALIDATED });
  } finally {
    yield put({ type: types.FINALLY_REQUEST_COMPANIES_NON_VALIDATED });
  }
}

/**
 *
 */

const validateCompany = ({ payload }: { payload: object }): Promise<IRequestSaga> | unknown => {
  try {
    return company.validateCompany({ payload });
  } catch (error) {
    return error;
  }
};

function* validateCompanyCall(actions: IActionSaga) {
  try {
    const { data }: IRequestSaga = yield call(validateCompany, actions);

    yield put({ type: types.COMPANY_VALIDATED_SUCCESSFULLY, payload: { data } });
  } catch (error) {
    yield resolveSagaError(error);

    yield put({ type: types.FAILURE_VALIDATE_COMPANY });
  } finally {
    yield put({ type: types.FINALLY_REQUEST_VALIDATE_COMPANY });
  }
}

/**
 *
 */

const refuseCompany = ({ payload }: { payload: object }): Promise<IRequestSaga> | unknown => {
  try {
    return company.refuseCompany({ payload });
  } catch (error) {
    return error;
  }
};

function* refuseCompanyCall(actions: IActionSaga) {
  try {
    const { data }: IRequestSaga = yield call(refuseCompany, actions);

    yield put({ type: types.COMPANY_REFUSED_SUCCESSFULLY, payload: { data } });
  } catch (error) {
    yield resolveSagaError(error);

    yield put({ type: types.FAILURE_REFUSE_COMPANY });
  } finally {
    yield put({ type: types.FINALLY_REQUEST_REFUSE_COMPANY });
  }
}

/**
 *
 */

const updateCompanyWithEcommerce = ({
  params,
  payload,
}: {
  params: { [key: string]: string };
  payload: object;
}): Promise<IRequestSaga> | unknown => {
  try {
    return company.updateCompanyWithEcommerce({ cnpj: params.cnpj, payload });
  } catch (error) {
    return error;
  }
};

function* updateCompanyWithEcommerceCall(actions: IActionSaga) {
  try {
    const { data }: IRequestSaga = yield call(updateCompanyWithEcommerce, actions);

    yield toast.success('Empresa atualizada com sucesso');

    yield put({ type: types.COMPANY_UPDATED_SUCCESSFULLY, payload: { data } });
  } catch (error) {
    yield resolveSagaError(error);

    yield put({ type: types.FAILURE_UPDATE_COMPANY });
  } finally {
    yield put({ type: types.FINALLY_UPDATE_COMPANY });
  }
}

/**
 *
 */

const findCompanyById = ({ params }: { params: { [key: string]: string } }): Promise<IRequestSaga> | unknown => {
  try {
    return company.findCompanyById({ id: params.id });
  } catch (error) {
    return error;
  }
};

function* findCompanyByIdCall(actions: IActionSaga) {
  try {
    const { data }: IRequestSaga = yield call(findCompanyById, actions);

    yield put({ type: types.COMPANY_FETCHED_BY_ID_SUCCESSFULLY, payload: { data } });
  } catch (error) {
    yield resolveSagaError(error);

    yield put({ type: types.FAILURE_FETCH_COMPANY_BY_ID });
  } finally {
    yield put({ type: types.FINALLY_FETCH_COMPANY_BY_ID });
  }
}

export function* CompanyLatest() {
  yield all([
    takeLatest(types.CREATING_COMPANY, createCompanyCall),
    takeLatest(types.FETCHING_COMPANY_BY_CNPJ, validateCompanyCnpjToRegisterCall),
    takeLatest(types.FETCHING_COMPANIES_NON_VALIDATED, findAllCompaniesNonValidatedCall),
    takeLatest(types.VALIDATING_COMPANY, validateCompanyCall),
    takeLatest(types.REFUSING_COMPANY, refuseCompanyCall),
    takeLatest(types.UPDATING_COMPANY, updateCompanyWithEcommerceCall),
    takeLatest(types.FETCHING_COMPANY_BY_ID, findCompanyByIdCall),
  ]);
}
