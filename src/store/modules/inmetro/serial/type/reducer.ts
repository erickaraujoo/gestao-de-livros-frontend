import { InitialStateReducer } from '../../../../../models/redux/reducers';
import { IActionReducer } from './../../../../../models/redux/reducers';
import { produce } from 'immer';
import { loading, types, success, failure, defaultValue } from './../../../../types';

const inmetroSerialType = (state = InitialStateReducer, action: IActionReducer) =>
  produce(state, (draft) => {
    switch (action.type) {
      case types.INMETRO.SERIAL.TYPE.REQUEST:
        return loading(draft);
      case types.INMETRO.SERIAL.TYPE.SUCCESS:
        draft.data = action.payload.data;
        return success(draft);
      case types.INMETRO.SERIAL.TYPE.FAILURE:
        return failure(action, draft);
      case types.INMETRO.SERIAL.TYPE.FINALLY:
        return defaultValue(draft);
    }
  });

export default inmetroSerialType;
