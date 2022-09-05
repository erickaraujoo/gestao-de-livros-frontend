import { IActionReducer, InitialStateReducer } from '../../../models/redux/reducers';
import { defaultValue } from '../../types';
import produce from 'immer';
import { types, loading, success, failure } from '../../types';

const company = (state = InitialStateReducer, action: IActionReducer) =>
  produce(state, (draft) => {
    switch (action.type) {
      case types.CREATING_COMPANY:
      case types.FETCHING_COMPANY_BY_CNPJ:
      case types.FETCHING_COMPANY_BY_ID:
      case types.FETCHING_COMPANIES_NON_VALIDATED:
      case types.VALIDATING_COMPANY:
      case types.REFUSING_COMPANY:
      case types.UPDATING_COMPANY:
        return loading(draft);

      case types.COMPANY_CREATED_SUCCESSFULLY:
      case types.COMPANY_BY_CNPJ_FETCH_SUCCESSFULLY:
      case types.COMPANY_FETCHED_BY_ID_SUCCESSFULLY:
      case types.COMPANIES_NON_VALIDATED_FETCH_SUCCESSFULLY:
      case types.COMPANY_VALIDATED_SUCCESSFULLY:
      case types.COMPANY_REFUSED_SUCCESSFULLY:
      case types.COMPANY_UPDATED_SUCCESSFULLY:
        draft.data = action.payload.data;
        return success(draft);

      case types.FAILURE_CREATE_COMPANY:
      case types.FAILURE_FETCH_COMPANY_BY_CNPJ:
      case types.FAILURE_FETCH_COMPANY_BY_ID:
      case types.FAILURE_FETCH_COMPANIES_NON_VALIDATED:
      case types.FAILURE_VALIDATE_COMPANY:
      case types.FAILURE_REFUSE_COMPANY:
      case types.FAILURE_UPDATE_COMPANY:
        return failure(action, draft);

      case types.FINALLY_CREATE_COMPANY:
      case types.FINALLY_REQUEST_COMPANY_BY_CNPJ:
      case types.FINALLY_FETCH_COMPANY_BY_ID:
      case types.FINALLY_REQUEST_COMPANIES_NON_VALIDATED:
      case types.FINALLY_REQUEST_VALIDATE_COMPANY:
      case types.FINALLY_REQUEST_REFUSE_COMPANY:
      case types.FINALLY_UPDATE_COMPANY:
        return defaultValue(draft);

      default:
    }
  });

export default company;
