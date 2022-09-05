import { IActionReducer, InitialStateReducer } from '../../../models/redux/reducers';
import produce from 'immer';
import { types, loading, success, failure, defaultValue } from '../../types';

const workshop = (state = InitialStateReducer, action: IActionReducer) =>
  produce(state, (draft) => {
    switch (action.type) {
      case types.WRITING_WORKSHOP_DATA:
      case types.FETCHING_WORKSHOP_DATA:
        return loading(draft);
      case types.WORKSHOP_DATA_FETCHED_SUCCESSFULLY:
      case types.WORKSHOP_DATA_WRITED_SUCCESSFULLY:
        draft.data = action.payload.data;
        return success(draft);
      case types.FAILURE_FETCH_WORKSHOP_DATA:
      case types.FAILURE_WRITE_WORKSHOP_DATA:
        return failure(action, draft);
      case types.FINALLY_REQUEST_WORKSHOP_DATA:
        return defaultValue(draft);
      default:
    }
  });

export default workshop;
