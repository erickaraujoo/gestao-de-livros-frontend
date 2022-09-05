import { types } from '../../../types';

export const fetchViacepAddressByZipCode = ({ zipCode }: { zipCode: string }) => {
  return {
    type: types.FETCHING_VIACEP_ADDRESS_BY_ZIPCODE,
    payload: { zipCode },
  };
};
