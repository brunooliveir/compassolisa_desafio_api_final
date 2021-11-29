const Joi = require('joi');
const errorFormatted = require('../../../utils/helpers/errorFormatter');
const { idRegex, placaRegex, dinheiroRegex } = require('../../../utils/helpers/regex');

const MAXIMUM_STRING_PLACA = 7;

module.exports = async (req, res, next) => {
  try {
    const schema = Joi.object({
      id_carro: Joi.string().trim().required().id().regex(idRegex),
      id_locadora: Joi.string().trim().required().id().regex(idRegex),
      status: Joi.string().valid('disponivel', 'indisponivel').required(),
      valor_diaria: Joi.string().trim().required().regex(dinheiroRegex).message('valor_diaria incorrect format'),
      placa: Joi.string().trim().uppercase().regex(placaRegex).max(MAXIMUM_STRING_PLACA).required()
    });

    const { error } = await schema.validate(req.body, { abortEarly: false });
    if (error) throw error;
    return next();
  } catch (error) {
    return res.status(400).json(errorFormatted(error));
  }
};
