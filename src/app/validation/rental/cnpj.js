const CnpjBadValue = require('../../errors/rental/CnpjBadValue');

module.exports = async (strCnpjBrute) => {
  const cnpj = strCnpjBrute.replace(/[^\d]+/g, '');
  if (cnpj === '') {
    throw new CnpjBadValue(strCnpjBrute);
  }
  if (cnpj.length !== 14) {
    throw new CnpjBadValue(strCnpjBrute);
  }

  if (
    cnpj === '00000000000000' ||
    cnpj === '11111111111111' ||
    cnpj === '22222222222222' ||
    cnpj === '33333333333333' ||
    cnpj === '44444444444444' ||
    cnpj === '55555555555555' ||
    cnpj === '66666666666666' ||
    cnpj === '77777777777777' ||
    cnpj === '88888888888888' ||
    cnpj === '99999999999999'
  ) {
    throw new CnpjBadValue(strCnpjBrute);
  }

  let length = cnpj.length - 2;
  let numbers = cnpj.substring(0, length);
  const digits = cnpj.substring(length);
  let sum = 0;
  let pos = length - 7;
  for (let i = length; i >= 1; i--) {
    sum += numbers.charAt(length - i) * pos;
    pos -= 1;
    if (pos < 2) {
      pos = 9;
    }
  }
  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(digits.charAt(0), 10)) {
    throw new CnpjBadValue(strCnpjBrute);
  }
  length += 1;
  numbers = cnpj.substring(0, length);
  sum = 0;
  pos = length - 7;
  for (let i = length; i >= 1; i--) {
    sum += numbers.charAt(length - i) * pos;
    pos -= 1;
    if (pos < 2) {
      pos = 9;
    }
  }
  result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(digits.charAt(1), 10)) {
    throw new CnpjBadValue(strCnpjBrute);
  }

  return true;
};
