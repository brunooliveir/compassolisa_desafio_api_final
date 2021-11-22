const BadRequest = require('../errors/BadRequest');

module.exports = async (strCnpjBrute) => {
  const cnpj = strCnpjBrute.replace(/[^\d]+/g, '');
  if (cnpj === '') throw new BadRequest(`cnpj ${strCnpjBrute}`);
  if (cnpj.length !== 14) throw new BadRequest(`cnpj ${strCnpjBrute}`);
  if (
    [
      '00000000000000',
      '11111111111111',
      '22222222222222',
      '33333333333333',
      '44444444444444',
      '55555555555555',
      '66666666666666',
      '77777777777777',
      '88888888888888',
      '99999999999999'
    ].includes(cnpj)
  )
    throw new BadRequest(`cnpj ${strCnpjBrute}`);

  let length = cnpj.length - 2;
  let numbers = cnpj.substring(0, length);
  const digits = cnpj.substring(length);
  let sum = 0;
  let pos = length - 7;
  for (let i = length; i >= 1; i--) {
    sum += numbers.charAt(length - i) * pos;
    pos -= 1;
    if (pos < 2) pos = 9;
  }
  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(digits.charAt(0), 10)) throw new BadRequest(`cnpj ${strCnpjBrute}`);
  length += 1;
  numbers = cnpj.substring(0, length);
  sum = 0;
  pos = length - 7;
  for (let i = length; i >= 1; i--) {
    sum += numbers.charAt(length - i) * pos;
    pos -= 1;
    if (pos < 2) pos = 9;
  }
  result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(digits.charAt(1), 10)) throw new BadRequest(`cnpj ${strCnpjBrute}`);
  return true;
};
