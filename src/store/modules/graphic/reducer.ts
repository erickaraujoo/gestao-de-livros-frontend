import { IActionReducer, InitialStateReducer } from '../../../models/redux/reducers';
import { defaultValue } from './../../types';
import produce from 'immer';
import { types, loading, success, failure } from '../../types';

const graphic = (state = InitialStateReducer, action: IActionReducer) =>
  produce(state, (draft) => {
    switch (action.type) {
      case types.FETCHING_GRAPHIC_DATA:
      case types.WRITING_GRAPHIC_DATA:
        return loading(draft);
      case types.GRAPHIC_DATA_FETCHED_SUCCESSFULLY:
      case types.GRAPHIC_DATA_WRITED_SUCCESSFULLY:
        draft.data = action.payload.data;
        return success(draft);
      case types.FAILURE_FETCH_GRAPHIC_DATA:
      case types.FAILURE_WRITE_GRAPHIC_DATA:
        return failure(action, draft);
      case types.FINALLY_REQUEST_GRAPHIC_DATA:
        return defaultValue(draft);
      default:
    }
  });

export default graphic;
