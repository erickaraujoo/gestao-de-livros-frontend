import { IActionReducer, InitialStateReducer } from '../../../models/redux/reducers';
import { defaultValue } from '../../types';
import produce from 'immer';
import { types, loading, success, failure } from '../../types';

const user = (state = InitialStateReducer, action: IActionReducer) =>
  produce(state, (draft) => {
    switch (action.type) {
      case types.FETCHING_USER_BY_EMAIL:
        return loading(draft);
      case types.USER_BY_EMAIL_FETCH_SUCCESSFULLY:
        draft.data = action.payload.data;
        return success(draft);
      case types.FAILURE_FETCH_USER_BY_EMAIL:
        return failure(action, draft);
      case types.FINALLY_REQUEST_USER_BY_EMAIL:
        return defaultValue(draft);
      default:
    }
  });

export default user;
