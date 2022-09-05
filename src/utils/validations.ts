import { ERROR_MATCH, ERROR_REQUIRED, ERROR_MIN_VALUE, PATTERN_CNPJ, PATTERN_ZIP_CODE } from './../config/constants';
import * as yup from 'yup';

const stringRequired = (value: string) => yup.string().trim().required(ERROR_REQUIRED(value));

const stringNotRequired = () => yup.string().trim().notRequired();

const username = yup
  .string()
  .trim()
  .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, ERROR_MATCH('E-mail'))
  .required(ERROR_REQUIRED('E-mail'));

const usernameConfirmation = yup
  .string()
  .trim()
  .oneOf([yup.ref('username'), null], 'Os e-mails devem corresponder')
  .required(ERROR_REQUIRED('Confirmação de e-mail'));

const password = yup.string().required(ERROR_REQUIRED('Senha'));

const passwordConfirmation = yup
  .string()
  .oneOf([yup.ref('password'), null], 'As senhas devem corresponder')
  .required(ERROR_REQUIRED('Confirmação de senha'));

const cnpj = yup.string().trim().required(ERROR_REQUIRED('CNPJ')).matches(PATTERN_CNPJ, 'Exemplo: 58.181.650/0001-60');

const zipCode = yup.string().trim().required(ERROR_REQUIRED('CEP')).matches(PATTERN_ZIP_CODE, 'Exemplo: 06474-521');

const serial = (val: string) => yup.string().min(3, ERROR_MIN_VALUE(val, 3));

const registerItl = yup.string().min(2, ERROR_MIN_VALUE('Registro ITL', 2)).required(ERROR_REQUIRED('Registro ITL'));

const licensePlate = yup
  .string()
  .min(7, ERROR_MIN_VALUE('Placa do veículo', 7))
  .required(ERROR_REQUIRED('Placa do veículo'));

export const loginSchema = yup.object().shape({
  username,
  password,
});

export const registerCompanySchema = yup.object().shape({
  cnpj,
  name: stringRequired('Razão Social'),

  isItl: yup.boolean(),
  itlRegister: yup.string().when('$isItl', {
    is: (isItl: boolean) => isItl,
    then: stringRequired('Registro ITL'),
  }),

  zipCode,
  street: stringRequired('Logradouro'),

  state: stringRequired('Estado'),
  city: stringRequired('Cidade'),

  neighborhood: stringRequired('Bairro'),
  number: stringRequired('Número'),

  complement: stringNotRequired(),
});

export const registerLoginSchema = yup.object().shape({
  name: stringRequired('Nome'),
  username,
  usernameConfirmation,
  password,
  passwordConfirmation,
});

export const blockChipsSchema = yup.object().shape({
  licensePlate,
  password,
});

export const writeGraphicSchema = yup.object().shape({
  serial: serial('Número do selo'),
});

export const writeWorkshopSchema = yup.object().shape({
  date: stringRequired('Data de registro'),
  expirationDate: stringRequired('Data de validade'),
  registerItl,
  licensePlate,
  cylinderSerial: serial('Nº de série do cilindro GNV'),
  inmetroSerial: serial('Nº se selo do Inmetro'),
  inmetroSerialType: stringRequired('Tipo do selo Inmetro'),
  pressureReducerSerial: serial('Nº de série do redutor de pressão de GNV'),
});
