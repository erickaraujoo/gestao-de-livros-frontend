import { InitialStateReducer, IActionReducer } from '../../../models/redux/reducers';
import produce from 'immer';
import { types, loading, success, failure, defaultValue } from '../../types';

const inspector = (state = InitialStateReducer, action: IActionReducer) =>
  produce(state, (draft) => {
    switch (action.type) {
      case types.FETCHING_INSPECTOR_DATA:
        return loading(draft);
      case types.INSPECTOR_DATA_FETCHED_SUCCESSFULLY:
        draft.data = action.payload.data;
        return success(draft);
      case types.FAILURE_FETCH_INSPECTOR_DATA:
        return failure(action, draft);
      case types.FINALLY_REQUEST_INSPECTOR_DATA:
        return defaultValue(draft);
      default:
    }
  });

export default inspector;
