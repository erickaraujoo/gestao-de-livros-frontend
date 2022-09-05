import { all } from 'redux-saga/effects';

import { AuthLatest } from './auth';
import { GraphicLatest } from './graphic';
import { WorkshopLatest } from './workshop';
import { InspectorLatest } from './inspector';
import { ChipLatest } from './chip';
import { LogsLatest } from './logs';
import { ViacepAddressLatest } from './services/viacep';
import { StateLatest } from './address/state';
import { CityLatest } from './address/city';
import { CompanyLatest } from './company';
import { UserTypeLatest } from './userType';
import { UserLatest } from './user';
import { ReaderRequestLatest } from './readerRequest';
import { FrentistLatest } from './frentist';
import { SystemLatest } from './system';
import { InmetroSerialTypeLatest } from './inmetro/serial/type';

export default function* rootSaga() {
  yield all([
    AuthLatest(),
    CityLatest(),
    ChipLatest(),
    CompanyLatest(),

    ReaderRequestLatest(),

    GraphicLatest(),
    InspectorLatest(),
    FrentistLatest(),
    LogsLatest(),
    StateLatest(),
    UserLatest(),
    UserTypeLatest(),
    WorkshopLatest(),
    SystemLatest(),
    InmetroSerialTypeLatest(),

    ViacepAddressLatest(),
  ]);
}
