import { toast } from 'react-toastify';
import { TOAST_CONECTION_REFUSED } from './../../config/constants';

export const resolveSagaError = (error: any) => {
  if (error.response && error.response.data) return toast.error(error.response.data.message);
  else return toast.error(TOAST_CONECTION_REFUSED);
};
