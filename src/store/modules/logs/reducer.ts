import { failure, defaultValue, success } from '../../types';
import { InitialStateReducer, IActionReducer } from '../../../models/redux/reducers';
import { produce } from 'immer';
import { loading, types } from '../../types';

const logs = (state = InitialStateReducer, action: IActionReducer) =>
  produce(state, (draft) => {
    switch (action.type) {
      case types.FETCHING_LOGS:
        return loading(draft);
      case types.LOGS_FETCHED_SUCCESSFULLY:
        draft.data = action.payload.data;
        return success(draft);
      case types.FAILURE_FETCH_LOGS:
        return failure(action, draft);
      case types.FINALLY_REQUEST_LOGS:
        return defaultValue(draft);
    }
  });

export default logs;
