const BadRequest = require('../../errors/BadRequest');

module.exports = async (strCpfBrute) => {
  const strCPF = strCpfBrute.replace('.', '').replace('.', '').replace('-', '');
  let sum;
  let remainder;
  sum = 0;

  if (strCPF === '00000000000') throw new BadRequest(`cpf ${strCpfBrute}`);

  for (let i = 1; i <= 9; i++) sum += parseInt(strCPF.substring(i - 1, i), 10) * (11 - i);
  remainder = (sum * 10) % 11;

  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(strCPF.substring(9, 10), 10)) throw new BadRequest(`cpf ${strCpfBrute}`);

  sum = 0;
  for (let i = 1; i <= 10; i++) sum += parseInt(strCPF.substring(i - 1, i), 10) * (12 - i);
  remainder = (sum * 10) % 11;

  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(strCPF.substring(10, 11), 10)) throw new BadRequest(`cpf ${strCpfBrute}`);
  return true;
};
