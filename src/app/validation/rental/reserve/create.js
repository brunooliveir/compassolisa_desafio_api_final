const Joi = require('joi').extend(require('@joi/date'));
const errorFormatted = require('../../../utils/helpers/errorFormatter');
const { idRegex, dinheiroRegex } = require('../../../utils/helpers/regex');

module.exports = async (req, res, next) => {
  try {
    const schema = Joi.object({
      id_user: Joi.string().trim().required().id().regex(idRegex),
      data_inicio: Joi.date().format('DD/MM/YYYY').required(),
      data_fim: Joi.date().format('DD/MM/YYYY').required(),
      id_carro: Joi.string().trim().required().id().regex(idRegex),
      id_locadora: Joi.string().trim().required().id().regex(idRegex),
      valor_final: Joi.string().required().regex(dinheiroRegex).message('valor_final incorrect format')
    });

    const { error } = await schema.validate(req.body, { abortEarly: false });
    if (error) throw error;
    return next();
  } catch (error) {
    return res.status(400).json(errorFormatted(error));
  }
};
