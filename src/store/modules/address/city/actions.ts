import { types } from './../../../types';

export const fetchCitiesByState = ({ stateId }: { stateId: number }) => {
  return {
    type: types.FETCHING_CITIES_BY_STATE,
    payload: { stateId },
  };
};
