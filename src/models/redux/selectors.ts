import { IAuthSelector } from './../auth/index';
import { IChipSelector } from './../chip/index';
import { ILogSelector } from './../logs/index';
import { IViacepAddressSelector } from './../services/viacep/index';
import { IStateSelector } from '../address/state';
import { ICitySelector } from '../address/city';
import { IUserTypeSelector } from '../userType';
import { ICompanySelector } from '../company';
import { IUserSelector } from './../user/index';
import { IReaderRequestSelector } from '../readerRequest';
import { IFrentistSelector } from './../frentist/index';
import { ISystemSelector } from './../system/index';
import { IInmetroSerialTypeSelector } from '../inmetro/serial/type';

export interface IListSelectors {
  auth: IAuthSelector;
  city: ICitySelector;
  company: ICompanySelector;
  chip: IChipSelector;
  logs: ILogSelector;
  state: IStateSelector;
  user: IUserSelector;
  userType: IUserTypeSelector;
  system: ISystemSelector;
  inmetroSerialType: IInmetroSerialTypeSelector;

  viacepAddress: IViacepAddressSelector;

  readerRequest: IReaderRequestSelector;

  frentist: IFrentistSelector;
}
