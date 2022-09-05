import { IActionReducer, InitialStateReducer } from '../../../../models/redux/reducers';
import { defaultValue } from '../../../types';
import produce from 'immer';
import { types, loading, success, failure } from '../../../types';

const city = (state = InitialStateReducer, action: IActionReducer) =>
  produce(state, (draft) => {
    switch (action.type) {
      case types.FETCHING_CITIES_BY_STATE:
        return loading(draft);
      case types.CITIES_BY_STATE_FETCH_SUCCESSFULLY:
        draft.data = action.payload.data;
        return success(draft);
      case types.FAILURE_FETCH_CITIES_BY_STATE:
        return failure(action, draft);
      case types.FINALLY_REQUEST_CITIES_BY_STATE:
        return defaultValue(draft);
      default:
    }
  });

export default city;
