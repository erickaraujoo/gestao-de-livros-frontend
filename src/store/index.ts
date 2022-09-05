import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createReduxHistoryContext, reachify } from 'redux-first-history';
import { createBrowserHistory } from 'history';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './saga';

import auth from './modules/auth/reducer';
import company from './modules/company/reducer';
import city from './modules/address/city/reducer';
import chip from './modules/chip/reducer';
import graphic from './modules/graphic/reducer';
import inspector from './modules/inspector/reducer';
import frentist from './modules/frentist/reducer';
import logs from './modules/logs/reducer';
import state from './modules/address/state/reducer';
import user from './modules/user/reducer';
import userType from './modules/userType/reducer';
import workshop from './modules/workshop/reducer';
import system from './modules/system/reducer';
import inmetroSerialType from './modules/inmetro/serial/type/reducer';

import readerRequest from './modules/readerRequest/reducer';

import viacepAddress from './modules/services/viacep/reducer';

const sagaMiddleware = createSagaMiddleware();

const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
  history: createBrowserHistory(),
});

export const store = createStore(
  combineReducers({
    router: routerReducer,
    auth,
    company,
    city,
    chip,
    graphic,
    inspector,
    frentist,
    logs,
    state,
    user,
    userType,
    workshop,
    system,
    inmetroSerialType,

    viacepAddress,

    readerRequest,
  }),
  composeWithDevTools(applyMiddleware(routerMiddleware), applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(rootSaga);

export const routerHistory = createReduxHistory(store);
export const reachHistory = reachify(routerHistory);
