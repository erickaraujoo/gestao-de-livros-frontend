import { IResponseViacepAddress } from './../../models/services/viacep/index';
import { ICity } from './../../models/address/city/index';

export const formattedAddressViacepByZipCode = (data: IResponseViacepAddress) => ({
  neighborhood: data.bairro,
  zipCode: data.cep,
  complement: data.complemento,
  city: data.localidade,
  street: data.logradouro,
  uf: data.uf,
});

export const formattedStates = (data: { id: number; uf: string; name: string }[]) => {
  const states: { title: string; value: string | number; uf: string }[] = [
    { title: 'Selecione um estado', value: '', uf: '' },
  ];

  data && data.map(({ id, uf, name }) => states.push({ title: name, value: id, uf }));

  return states;
};

export const formattedCities = (data: ICity[]) => {
  const cities = [{ title: 'Selecione uma cidade', value: '' }];

  data && data.map(({ id, name }) => cities.push({ title: name, value: id }));

  return cities;
};
