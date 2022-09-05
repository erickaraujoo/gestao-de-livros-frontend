import { ICreateCompany } from './../../models/company';
import { ICreateUser } from './../../models/user';
import { ICompany } from './../../models/company/index';
import { returnLocalDateTimeToFormattedDate, returnNameUserType } from './../index';

export const formattedCreateCompany = ({ company, user }: { company: ICreateCompany; user: ICreateUser }) => ({
  cnpj: company.cnpj,
  phone: company.phone || null,
  name: company.name,
  stateRegistration: null,
  itlRegister: company.itlRegister || null,
  users: [user],
  address: {
    zipCode: company.zipCode,
    street: company.street,
    number: company.number,
    neighborhood: company.neighborhood,
    complement: company.complement || null,
    description: null,
    city: { id: Number.parseInt(company.city) },
  },
});

export const formattedAllCompaniesNonValidated = (data: ICompany | ICompany[]) =>
  Array.isArray(data)
    ? data.map(({ cnpj, createdAt, name, users }, index) => {
        if (users instanceof Array) {
          return {
            name,
            cnpj,
            userType: returnNameUserType(users[0].userType.name),
            createdAt: returnLocalDateTimeToFormattedDate(createdAt),
          };
        } else return [];
      })
    : [];
