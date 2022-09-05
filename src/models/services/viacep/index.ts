export interface IResponseViacepAddress {
  bairro: string;
  cep: string;
  complemento: string;
  localidade: string;
  logradouro: string;
  uf: string;
}

export interface IViacepAddress {
  neighborhood: string;
  zipCode: string;
  complement: string;
  city: string;
  street: string;
  uf: string;
}

export interface IViacepAddressSelector {
  data: IViacepAddress;
  loading: boolean;
  success: boolean;
  error: boolean;
}

export interface IRequestSagaViacepAddressByZipCode {
  data: IResponseViacepAddress;
}

/**
 *
 */

export const InitialViacepAddressData = {
  neighborhood: '',
  zipCode: '',
  complement: '',
  city: '',
  street: '',
  uf: '',
};
