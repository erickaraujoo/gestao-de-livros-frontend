import produce from 'immer';
import { IActionReducer, InitialStateReducer } from '../../../models/redux/reducers';
import { types, failure, loading, success, defaultValue } from '../../types';

const auth = (state = InitialStateReducer, action: IActionReducer) =>
  produce(state, (draft) => {
    switch (action.type) {
      case types.FETCHING_USER_DATA:
      case types.FETCHING_INTERNAL_USER_DATA:
        return loading(draft);
      case types.USER_DATA_FETCH_SUCCESSFULLY:
      case types.INTERNAL_USER_DATA_FETCH_SUCCESSFULLY:
      case types.REDUX_AUTH_DATA_CLEARED_SUCCESSFULLY:
        draft.data = action.payload.data;
        return success(draft);
      case types.FAILURE_FETCH_USER_DATA:
      case types.FAILURE_FETCH_INTERNAL_USER_DATA:
        return failure(action, draft);
      case types.FINALLY_REQUEST_USER_DATA:
      case types.FINALLY_REQUEST_INTERNAL_USER_DATA:
      case types.FINALLY_CLEAR_REDUX_AUTH_DATA:
        return defaultValue(draft);
      default:
    }
  });

export default auth;
