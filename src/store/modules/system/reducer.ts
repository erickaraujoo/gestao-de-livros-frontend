import { InitialStateReducer } from '../../../models/redux/reducers';
import { IActionReducer } from './../../../models/redux/reducers';
import produce from 'immer';
import { defaultValue, failure, loading, success, types } from '../../types';

const system = (state = InitialStateReducer, action: IActionReducer) =>
  produce(state, (draft) => {
    switch (action.type) {
      case types.SYSTEM.RESTART.REQUEST:
        return loading(draft);
      case types.SYSTEM.RESTART.SUCCESS:
        draft.data = action.payload.data;
        return success(draft);
      case types.SYSTEM.RESTART.FAILURE:
        return failure(action, draft);
      case types.SYSTEM.RESTART.FINALLY:
        return defaultValue(draft);
      default:
    }
  });

export default system;
