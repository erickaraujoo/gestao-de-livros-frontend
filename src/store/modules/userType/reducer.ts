import { IActionReducer, InitialStateReducer } from '../../../models/redux/reducers';
import { defaultValue } from '../../types';
import produce from 'immer';
import { types, loading, success, failure } from '../../types';

const userType = (state = InitialStateReducer, action: IActionReducer) =>
  produce(state, (draft) => {
    switch (action.type) {
      case types.FETCHING_USER_TYPES:
        return loading(draft);
      case types.USER_TYPES_FETCH_SUCCESSFULLY:
        draft.data = action.payload.data;
        return success(draft);
      case types.FAILURE_FETCH_USER_TYPES:
        return failure(action, draft);
      case types.FINALLY_REQUEST_USER_TYPES:
        return defaultValue(draft);
      default:
    }
  });

export default userType;
