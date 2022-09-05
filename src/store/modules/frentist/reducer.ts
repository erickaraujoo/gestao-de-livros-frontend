import produce from 'immer';
import { InitialStateReducer, IActionReducer } from '../../../models/redux/reducers';
import { types, loading, success, failure, defaultValue } from '../../types';

const frentist = (state = InitialStateReducer, action: IActionReducer) =>
  produce(state, (draft) => {
    switch (action.type) {
      case types.DECRYPTING_DATA_READING_FILLING_STATION:
      case types.GENERATING_SPREADSHEET_VALIDATION_DATA_FILLING_STATION:
        return loading(draft);
      case types.DATA_READING_FILLING_STATION_DECRYPTED_SUCCESSFULLY:
      case types.SPREADSHEET_VALIDATION_DATA_FILLING_STATION_GENERATE_SUCCESSFULLY:
        draft.data = action.payload.data;
        return success(draft);
      case types.FAILURE_DECRYPT_DATA_READING_FILLING_STATION:
      case types.FAILURE_GENERATE_SPREADSHEET_VALIDATION_DATA_FILLING_STATION:
        return failure(action, draft);
      case types.FINALLY_DECRYPT_READING_DATA_FILLING_STATION:
      case types.FINALLY_GENERATE_SPREADSHEET_VALIDATION_DATA_FILLING_STATION:
        return defaultValue(draft);
      default:
    }
  });

export default frentist;
