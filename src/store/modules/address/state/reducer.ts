import { IActionReducer, InitialStateReducer } from '../../../../models/redux/reducers';
import { defaultValue } from '../../../types';
import produce from 'immer';
import { types, loading, success, failure } from '../../../types';

const state = (state = InitialStateReducer, action: IActionReducer) =>
  produce(state, (draft) => {
    switch (action.type) {
      case types.FETCHING_STATES:
        return loading(draft);
      case types.STATES_FETCH_SUCCESSFULLY:
        draft.data = action.payload.data;
        return success(draft);
      case types.FAILURE_FETCH_STATES:
        return failure(action, draft);
      case types.FINALLY_REQUEST_STATES:
        return defaultValue(draft);
      default:
    }
  });

export default state;
