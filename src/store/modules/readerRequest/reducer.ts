import { IActionReducer, InitialStateReducer } from '../../../models/redux/reducers';
import { defaultValue } from './../../types';
import produce from 'immer';
import { types, loading, success, failure } from '../../types';

const readerRequest = (state = InitialStateReducer, action: IActionReducer) =>
  produce(state, (draft) => {
    switch (action.type) {
      case types.READING_DATA_FROM_CHIP:
      case types.READING_OFFLINE_DATA_FROM_CHIP:
      case types.RECORDING_DATA_ON_THE_CHIP:
        return loading(draft);

      case types.CHIP_DATA_READ_SUCCESSFULLY:
      case types.OFFLINE_CHIP_DATA_READ_SUCCESSFULLY:
      case types.DATA_SUCCESSFULLY_RECORDED_ON_THE_CHIP:
        draft.data = action.payload.data;
        return success(draft);

      case types.FAILURE_READ_DATA_FROM_CHIP:
      case types.FAILURE_READ_OFFLINE_DATA_FROM_CHIP:
      case types.FAILURE_RECORD_DATA_ON_THE_CHIP:
        return failure(action, draft);

      case types.FINALLY_READ_DATA_FROM_THE_CHIP:
      case types.FINALLY_READ_OFFLINE_DATA_FROM_THE_CHIP:
      case types.FINALLY_RECORD_DATA_ON_THE_CHIP:
        return defaultValue(draft);

      default:
    }
  });

export default readerRequest;
