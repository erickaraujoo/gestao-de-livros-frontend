import Axios from 'axios';
import { AES, enc } from 'crypto-js';
import { NO_CONTENT, LOADING_DATA, CONFIG, TOAST_CONECTION_REFUSED } from './../config/constants';
import { ICylinder } from './../models/workshop';
import { cnpjMask, zipCodeMask } from './mask';
import { IPageableCompanyResponse, ICompany } from './../models/company/index';
import { toast } from 'react-toastify';
import { Dispatch, SetStateAction } from 'react';

export const returnToUpperCase = (value: string) => value.toUpperCase();

export const returnToken = () => localStorage.getItem('token');

export const returnUser = () => {
  const users = localStorage.getItem('users');

  if (users) return AES.decrypt(users, CONFIG.KEY_LOCAL_STORAGE).toString(enc.Utf8);

  return null;
};

export const returnCompany = () => {
  const company = localStorage.getItem('company');

  if (company) return AES.decrypt(company, CONFIG.KEY_LOCAL_STORAGE).toString(enc.Utf8);

  return null;
};

export const setCompanyToLocalStorage = (company: ICompany) => {
  const hasCompany = localStorage.getItem('company');

  if (hasCompany) localStorage.removeItem('company');

  return localStorage.setItem('company', AES.encrypt(JSON.stringify(company), CONFIG.KEY_LOCAL_STORAGE).toString());
};

export const returnCurrentDateToISOString = () => new Date().toLocaleDateString().split('/').reverse().join('-');

export const returnFormmatedDate = (date: any) => (date ? date.split('-').reverse().join('/') : null);

export const returnLocalDateTimeToFormattedDate = (date: any) =>
  date ? `${date.split('T')[0].split('-').reverse().join('/')} às ${date.split('T')[1]}` : null;

export const returnDateISOStringToFormattedDate = (date: string) => (date ? date.split('-').reverse().join('/') : null);

export const returnRequestValueState = (value: any, loading: boolean, error: boolean) => {
  if (value) return value;
  if (error || (!loading && !value)) return NO_CONTENT;

  return LOADING_DATA;
};

export const returnParseJson = (json: string) => JSON.parse(json);

export const returnJsonStringify = (json: Object) => JSON.stringify(json);

export const validateCurrentInputs = (data: ICylinder) =>
  !!(data.cylinderSerial.length >= 3 && data.inmetroSerial.length >= 3 && data.inmetroSerialType);

export const formatJson = (json: any) => {
  try {
    const formattedJson = JSON.stringify(JSON.parse(json), null, 4);

    return formattedJson;
  } catch (error) {
    return 'Não foi possível renderizar este json, arquivo muito extenso';
  }
};

export const formatJsonLog = (json: any) => {
  try {
    const parseJson = JSON.parse(json);
    const jsonToFormat = JSON.parse(json);
    jsonToFormat.response = {};

    if (!Object.keys(parseJson).length) return json;

    const keys = Object.keys(parseJson.response || parseJson);

    if (!parseJson.response) {
      const recordingData = keys.filter((key) => key === 'workshop' || key === 'graphic');

      if (recordingData && recordingData.length)
        return keys.map((key) => JSON.stringify(JSON.parse(parseJson[key]), null, 4));

      return JSON.stringify(parseJson, null, 4);
    }

    keys.map((key) => (jsonToFormat.response[key] = JSON.parse(parseJson.response[key])));

    return JSON.stringify(jsonToFormat, null, 4);
  } catch (error) {
    return 'Não foi possível renderizar este json, arquivo muito extenso';
  }
};

export const returnStatusText = (status: string) => {
  switch (status) {
    case '200':
      return 'OK';
    case '201':
      return 'Created';
    case '202':
      return 'Accepted';
    case '203':
      return 'Non-Authoritative Information';
    case '204':
      return 'No Content';
    case '400':
      return 'Bad Request';
    case '401':
      return 'Unauthorized';
    case '403':
      return 'Forbidden';
    case '404':
      return 'Not Found';
    case '405':
      return 'Method Not Allowed';
    case '408':
      return 'Request Timeout';
    case '409':
      return 'Conflict';
    case '414':
      return 'URI Too Long';
    case '425':
      return 'Too Early';
    case '429':
      return 'Too Many Requests';
    case '500':
      return 'Bad Request';
    case '504':
      return 'Gateway Timeout';
    case '502':
      return 'Bad Gateway';
  }
};

export const returnSha256 = async (value: string) => {
  const msgBuffer = new TextEncoder().encode(value);

  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);

  const hashArray = Array.from(new Uint8Array(hashBuffer));

  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
};

export const returnNameUserType = (value: string) => {
  switch (value) {
    case 'graphic':
      return 'Gráfica';
    case 'workshop':
      return 'ITL';
    case 'frentist':
      return 'Posto de Abastecimento';
    case 'inspector':
      return 'Fiscalização';
    case 'installer':
      return 'Instalador';
    case 'cylinder_manufacture':
      return 'Fabricante';
    case 'cylinder_requalifier':
      return 'Requalificador';
  }
};

export const returnFormattedCnpj = (value: string) => {
  const cnpj = value.trim();

  return cnpjMask(cnpj);
};

export const returnFormattedZipCode = (value: string) => {
  const zipCode = value.trim();

  return zipCodeMask(zipCode);
};

export const returnUnformattedCnpj = (value: string) => {
  const cnpj = value.trim();

  return cnpj.match(/\d/g)?.join('');
};

export const removeBlankAttributes = <T>(obj: T): T => {
  const acc: Partial<T> = {};

  for (const key in obj) if (obj[key]) acc[key] = obj[key];

  return acc as T;
};

export const returnDateWithoutFormatting = (date: Date) => date.toLocaleDateString().replace('/', '');

export const instanceOfPageableCompany = (data: any): data is IPageableCompanyResponse => data;

export const instanceOfICompany = (data: any): data is ICompany => data;

export function* resolveAxiosToastError(response: any) {
  yield response && response.data.message && !response.data.errorType && toast.error(response.data.message);
  yield response && (!response.data || !response.data.message) && toast.error(TOAST_CONECTION_REFUSED);

  return null;
}

export const generateSourceAxiosToken = (
  handleSourceAxiosToken: Dispatch<SetStateAction<{ token: Object; cancel: Object } | null>>,
) => handleSourceAxiosToken(Axios.CancelToken.source());
