const Joi = require('joi').extend(require('@joi/date'));
const CpfChecker = require('./cpf');

const LIMIT_MINIMUM_NOME_STRING_LENGHT = 5;
const LIMIT_MAXIMUM_NOME_STRING_LENGHT = 50;

const LIMIT_MAXIMUM_CPF_STRING_LENGHT = 14;

const LIMIT_MINIMUM_SENHA_STRING_LENGHT = 6;
const LIMIT_MAXIMUM_SENHA_STRING_LENGHT = 50;

const LIMIT_MINIMUM_EMAIL_STRING_LENGHT = 5;
const LIMIT_MAXIMUM_EMAIL_STRING_LENGHT = 50;

module.exports = async (req, res, next) => {
  try {
    const schema = Joi.object({
      nome: Joi.string().min(LIMIT_MINIMUM_NOME_STRING_LENGHT).max(LIMIT_MAXIMUM_NOME_STRING_LENGHT).trim().required(),
      cpf: Joi.string().max(LIMIT_MAXIMUM_CPF_STRING_LENGHT).required(),
      data_nascimento: Joi.date().format('DD/MM/YYYY').required(),
      email: Joi.string()
        .email()
        .min(LIMIT_MINIMUM_EMAIL_STRING_LENGHT)
        .max(LIMIT_MAXIMUM_EMAIL_STRING_LENGHT)
        .required(),
      senha: Joi.string().min(LIMIT_MINIMUM_SENHA_STRING_LENGHT).max(LIMIT_MAXIMUM_SENHA_STRING_LENGHT).required(),
      habilitado: Joi.string().valid('sim', 'não').required()
    });

    try {
      const strCpfBrute = await schema.validate(req.body).value.cpf;
      if (strCpfBrute) {
        if (strCpfBrute.length <= LIMIT_MAXIMUM_CPF_STRING_LENGHT) {
          await CpfChecker(strCpfBrute);
        }
      }
    } catch (error) {
      return next(error);
    }

    const { error } = await schema.validate(req.body, { abortEarly: false });
    if (error) throw error;
    return next();
  } catch (error) {
    const reworkedError = [];
    if (error.details.length > 1) {
      error.details.forEach((element) => {
        reworkedError[error.details.indexOf(element)] = { description: error.details.path[0], name: element.message };
      });
    } else {
      return res.status(400).json({ description: error.details[0].path[0], name: error.details[0].message });
    }

    return res.status(400).json(reworkedError);
  }
};
