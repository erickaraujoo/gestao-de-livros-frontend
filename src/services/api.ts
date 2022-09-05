import { CONFIG } from './../config/constants';
import { returnToken, returnUser } from './../utils/index';
import Axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios';
import { IUser } from './../models/user/index';
import { formatLog } from '../utils/formatters/log';

const api: AxiosInstance = Axios.create({ baseURL: CONFIG.BASE_API_URL });

const handleRequest = (config: AxiosRequestConfig) => {
  const token = returnToken();
  const stringifyUser = returnUser();

  const user: IUser = stringifyUser ? JSON.parse(stringifyUser) : null;

  if (token) config.headers.Authorization = `${CONFIG.SCHEME} ${token}`;
  if (user) config.headers.user = user.id;

  return config;
};

const handleFetchWithToken = async (input: string) => {
  const token = returnToken();

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `${CONFIG.SCHEME} ${token}`,
  };

  const data = await fetch(input, { headers });

  const json = await data.json();

  return { data: json };
};

const handleResponse = ({ data }: AxiosResponse) => data;

api.interceptors.request.use(handleRequest, handleResponse);
api.interceptors.response.use(
  async (response) => {
    if (response.config.headers.user && response.config.url) {
      const route = response.config.url;

      switch (route) {
        case '/reader/reading':
        case '/reader/record':
        case '/chip/block':
          await api.post('/logs/generate', formatLog(response));
          break;
        default:
          break;
      }
    }

    return response;
  },
  async (error) => Promise.reject(error),
);

const configHeaders = (userId: number) => ({
  headers: {
    user: userId,
  },
});

export const auth = {
  userAuthenctication: ({ payload }: { payload: object }) => api.post('/authentication', payload),
  internalUserAuthentication: ({ payload }: { payload: object }) => api.post('/authentication/internal', payload),
};

export const user = {
  validateEmailToRegister: ({ email }: { email: string }) => api.get(`/users/validate/email/${email}`),
};

export const userType = {
  findToCrate: () => api.get('/user/types'),
};

export const address = {
  findStates: () => api.get('/states'),
  findCitiesByState: ({ stateId }: { stateId: string }) => api.get(`/states/${stateId}/cities`),
};

export const company = {
  create: ({ payload }: { payload: object }) => api.post('/company', payload),
  validateCompanyCnpjToRegister: ({ cnpj }: { cnpj: string }) => api.get(`/company/validate/cnpj/${cnpj}`),
  findAllCompaniesNonValidated: ({ payload }: { payload: object }) => api.get('/company/non-validated', payload),
  findCompanyById: ({ id }: { id: string }) => api.get(`/company/id/${id}`),
  validateCompany: ({ payload }: { payload: object }) => api.post('/company/validation', payload),
  refuseCompany: ({ payload }: { payload: object }) => api.put('/company/validation/refuse', payload),
  updateCompanyWithEcommerce: ({ cnpj, payload }: { cnpj: string; payload: object }) =>
    api.put(`/company/workshop/cnpj/${cnpj}`, payload),
};

export const reader = {
  read: ({ userId }: { userId: number }) => api.get('/reader/reading', configHeaders(userId)),
  offlineRead: async () => await handleFetchWithToken(`${CONFIG.BASE_OFFLINE_API_URL}/reader/reading`),
  record: ({ payload, userId }: { payload: object; userId: number }) =>
    api.post('/reader/record', payload, configHeaders(userId)),
};

export const graphic = {
  read: ({ userId }: { userId: number }) => api.get('/graphic/read', configHeaders(userId)),
  write: ({ payload, userId }: { payload: object; userId: number }) =>
    api.post('/graphic/write', payload, configHeaders(userId)),
};

export const workshop = {
  read: ({ userId }: { userId: number }) => api.get('/workshop/read', configHeaders(userId)),
  write: ({ payload, userId }: { payload: object; userId: number }) =>
    api.post('/workshop/write', payload, configHeaders(userId)),
};

export const inspector = {
  read: ({ userId }: { userId: number }) => api.post('/inspector/read', configHeaders(userId)),
};

export const frentist = {
  decrypDataReadingFillingStation: ({ payload }: { payload: object }) =>
    api.post('/filling-station/spreadsheet/validation-data/decrypt', payload),
  getExpirationDataToGenerateSpreadsheet: () => api.get('/filling-station/spreadsheet/validation-data'),
};

export const chip = {
  blockChips: ({ payload, userId }: { payload: object; userId: number }) =>
    api.post('/chip/block', payload, configHeaders(userId)),
  checkConnectionChip: ({ cancelToken }: { cancelToken: any }) => api.get('/chip/check/connection', { cancelToken }),
  checkOfflineConnectionChip: async () =>
    await handleFetchWithToken(`${CONFIG.BASE_OFFLINE_API_URL}/chip/check/connection`),
  checkBlockChip: () => api.get('/chip/check/block'),
};

export const logs = {
  findAll: ({ payload }: { payload: object }) => api.get('/logs/all', payload),
};

export const system = {
  restartSystem: () => api.get('/system/restart'),
};

export const inmetroSerialType = {
  findAll: () => api.get('/inmetro-serial-type/all'),
};
