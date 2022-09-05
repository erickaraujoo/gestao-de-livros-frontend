export const cnpjMask = (value: string) => {
  const cnpj = value
    .replace(/[^\d]/g, '')
    .replace(/^(\d{2})(\d)/, '$1.$2')
    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2');

  return cnpj;
};

export const zipCodeMask = (value: string) => {
  const zipCode = value.replace(/[^\d]/g, '').replace(/^(\d{5})(\d)/, '$1-$2');

  return zipCode;
};
