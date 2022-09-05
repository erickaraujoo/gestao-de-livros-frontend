import Axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { CONFIG } from './../config/constants';

const apiViacep: AxiosInstance = Axios.create({ baseURL: CONFIG.API_VIA_CEP });

const handleRequest = (config: AxiosRequestConfig) => config;

const handleResponse = ({ data }: AxiosResponse) => data;

apiViacep.interceptors.request.use(handleRequest, handleResponse);

apiViacep.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => Promise.reject(error),
);

export const address = {
  fetchAddressByZipCode: ({ zipCode }: { zipCode: string }) => apiViacep.get(`/ws/${zipCode}/json`),
};
