import { failure, defaultValue, success } from './../../types';
import { InitialStateReducer, IActionReducer } from './../../../models/redux/reducers';
import { produce } from 'immer';
import { loading, types } from '../../types';

const chip = (state = InitialStateReducer, action: IActionReducer) =>
  produce(state, (draft) => {
    switch (action.type) {
      case types.BLOCKING_CHIP:
      case types.CHECKING_CONNECTION_CHIP:
      case types.CHECKING_OFFLINE_CONNECTION_CHIP:
        return loading(draft);
      case types.CHIP_SUCCESSFULLY_BLOCKED:
      case types.CHIP_SUCCESSFULLY_CONNECTION_CHECKED:
      case types.CHIP_SUCCESSFULLY_OFFLINE_CONNECTION_CHECKED:
      case types.CHIP_SUCCESSFULLY_BLOCK_CHECKED:
        draft.data = action.payload.data;
        return success(draft);
      case types.FAILURE_BLOCK_CHIP:
      case types.FAILURE_CHECK_CONNECTION_CHIP:
      case types.FAILURE_CHECK_OFFLINE_CONNECTION_CHIP:
      case types.FAILURE_CHECK_BLOCK_CHIP:
        return failure(action, draft);
      case types.FINALLY_REQUEST_BLOCK_CHIP:
      case types.FINALLY_REQUEST_CHECK_CONNECTION_CHIP:
      case types.FINALLY_REQUEST_CHECK_OFFLINE_CONNECTION_CHIP:
      case types.FINALLY_REQUEST_CHECK_BLOCK_CHIP:
        return defaultValue(draft);
    }
  });

export default chip;
