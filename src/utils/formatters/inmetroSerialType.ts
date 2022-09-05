import { IInmetroSerialType } from './../../models/inmetro/serial/type/index';

export const formattedInmetroSerialTypes = (inmetroSerialTypes: IInmetroSerialType[]) =>
  inmetroSerialTypes.map(({ name, value }) => ({
    title: name,
    value,
  }));
