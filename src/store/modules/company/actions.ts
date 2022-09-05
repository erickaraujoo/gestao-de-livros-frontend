import { types } from '../../types';

export const createCompany = (data: any) => {
  return {
    type: types.CREATING_COMPANY,
    payload: data,
  };
};

export const validateCompanyCnpjToRegister = (cnpj: string) => {
  return {
    type: types.FETCHING_COMPANY_BY_CNPJ,
    payload: { cnpj },
  };
};

export const finalAllCompaniesNonValidated = (data: any) => {
  return {
    type: types.FETCHING_COMPANIES_NON_VALIDATED,
    payload: data,
  };
};

export const validateCompany = (data: any) => {
  return {
    type: types.VALIDATING_COMPANY,
    payload: data,
  };
};

export const refuseCompany = (data: any) => {
  return {
    type: types.REFUSING_COMPANY,
    payload: data,
  };
};

export const updateCompanyWithEcommerce = ({
  cnpj,
  company,
  userId,
}: {
  cnpj: string;
  company: { id: number };
  userId: number;
}) => {
  return {
    type: types.UPDATING_COMPANY,
    params: { cnpj },
    payload: company,
    userId,
  };
};

export const fetchCompanyById = ({ id }: { id: number }) => {
  return {
    type: types.FETCHING_COMPANY_BY_ID,
    params: { id },
  };
};
