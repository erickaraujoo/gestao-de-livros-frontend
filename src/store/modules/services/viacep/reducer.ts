import { IActionReducer, InitialStateReducer } from '../../../../models/redux/reducers';
import { defaultValue } from '../../../types';
import produce from 'immer';
import { types, loading, success, failure } from '../../../types';

const viacepAddress = (state = InitialStateReducer, action: IActionReducer) =>
  produce(state, (draft) => {
    switch (action.type) {
      case types.FETCHING_VIACEP_ADDRESS_BY_ZIPCODE:
        return loading(draft);
      case types.VIACEP_ADDRESS_BY_ZIPCODE_FETCH_SUCCESSFULLY:
        draft.data = action.payload.data;
        return success(draft);
      case types.FAILURE_FETCH_VIACEP_ADDRESS_BY_ZIPCODE:
        return failure(action, draft);
      case types.FINALLY_REQUEST_VIACEP_ADDRESS_BY_ZIPCODE:
        return defaultValue(draft);
      default:
    }
  });

export default viacepAddress;
