import 'dotenv/config';

export const PATTERN_EMAIL = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
export const PATTERN_CNPJ = /[\d]{2}.[\d]{3}.[\d]{3}\/[\d]{4}-[\d]{2}/;
export const PATTERN_ZIP_CODE = /[\d]{5}-[\d]{3}/;
export const PATTERN_PHONE = /\((\d){2}\)((\d){9}|(\d){8})/;
export const PATTERN_QUANTITY = /0*[1-9]\d{0,}/;

export const ERROR_MATCH = (value: string) => `${value} inválido ou mal formatado!`;
export const ERROR_REQUIRED = (value: string) => `${value} não foi preenchido`;
export const ERROR_MIN_VALUE = (value: string, min: number) => `${value} deve conter ${min} caracteres`;

export const MESSAGE_BLOCKED_SEAL = 'Este selo foi bloqueado pelo sistema e não será possível realizar esta operação';
export const MESSAGE_DATA_ALREADY_REGISTERED =
  'Este selo já foi registrado pelo sistema. Caso tenha dúvida, contate o suporte';
export const MESSAGE_RECORDING_ERROR =
  'Erro de gravação: O processo para gravação foi interrompida. Por favor, tente novamente.';
export const MESSAGE_READING_ERROR =
  'Erro de leitura: O processo para leitura foi interrompida. Por favor, tente novamente';
export const MESSAGE_REGISTRATION_AS_ATTENDANT_UNAVAILABLE = 'O cadastro como posto de abastecimento está indisponivel';

export const LOADING_DATA = 'Carregando...';
export const NO_CONTENT = 'Sem conteúdo.';

export const USER_TYPES = {
  GRAPHIC: 'graphic',
  FRENTIST: 'frentist',
  INSPECTOR: 'inspector',
  WORKSHOP: 'workshop',
  ADMIN: 'admin',
};

export const CHIP_VALUES_LABEL: any = {
  serial: 'Nº do selo de Inspeção:',
  date: 'Data de Inppeção',
  registerItl: 'Registro ITL:',
  licensePlate: 'Placa do Veículo:',
  cylinderSerial: 'Nº de série do cilindro GNV:',
  inmetroSerial: 'Nº de selo do Inmetro:',
  inmetroSerialType: 'Tipo do selo Inmetro:',
  pressureReducerSerial: 'Nº de série do red. de pressão de GNV:',
};

export const TOAST_WRITE_DATA_MESSAGE = () => 'Dados registrados com sucesso';
export const TOAST_ERROR_MESSAGE = () => 'Ops! Ocorreu um erro. Tente novamente mais tarde!';
export const TOAST_USER_NOT_FOUND = () => 'Usuário não encontrado';
export const TOAST_CONECTION_REFUSED = () => 'Falha na conexão com servidor';
export const TOAST_REGISTER_MESSAGE = (value: string) => `${value} registrado(a) com sucesso!`;

export const ERROR_TYPES_FOR_COMMUNICATION_WITH_READER = [
  'COMMAND_RESPONSE_SW_NOT_FOUND',
  'COMMAND_RESPONSE_DIFFERENT_THAN_EXPECTED',
  'FAILED_TO_CONNECT_SMART_CARD',
  'CHANNEL_TRANSMIT_ERROR',
];

export const ERROR_TYPES_FOR_UNRECOGNIZED_READER = [
  'LIST_FAILED',
  'NO_PCSC_TERMINAL_FOUND',
  'READER_IS_NOT_COMPATIBLE',
];

export const API_ERROR_TYPES = {
  BLOCKED_SEAL: 'BLOCKED_SEAL',
  COMMAND_RESPONSE_SW_NOT_FOUND: 'COMMAND_RESPONSE_SW_NOT_FOUND',
  COMMAND_RESPONSE_DIFFERENT_THAN_EXPECTED: 'COMMAND_RESPONSE_DIFFERENT_THAN_EXPECTED',
  FAILED_TO_CONNECT_SMART_CARD: 'FAILED_TO_CONNECT_SMART_CARD',
  CHANNEL_TRANSMIT_ERROR: 'CHANNEL_TRANSMIT_ERROR',
  LIST_FAILED: 'LIST_FAILED',
  NO_PCSC_TERMINAL_FOUND: 'NO_PCSC_TERMINAL_FOUND',
  READER_IS_NOT_COMPATIBLE: 'READER_IS_NOT_COMPATIBLE',
  DATA_ALREADY_REGISTERED: 'DATA_ALREADY_REGISTERED',
};

export const CONFIG = {
  BASE_API_URL: process.env.REACT_APP_BASE_API_URL,
  BASE_OFFLINE_API_URL: process.env.REACT_APP_BASE_OFFLINE_API_URL,
  API_VIA_CEP: process.env.REACT_APP_API_VIA_CEP,
  DEFAULT_ELECTRON_URL: process.env.REACT_APP_DEFAULT_ELECTRON_URL || '/',
  SCHEME: process.env.REACT_APP_SCHEME_TOKEN,
  KEY_LOCAL_STORAGE: 'rN8UD@*j5aBI',
};
