const Joi = require('joi');
const errorFormatted = require('../utils/helpers/errorFormatter');
const { idRegex } = require('../utils/helpers/regex');

module.exports = async (req, res, next) => {
  try {
    const id = Joi.object({
      id: Joi.string().required().id().regex(idRegex)
    });
    const { error } = id.validate(req.params, { abortEarly: false });
    if (error) throw error;
    return next();
  } catch (error) {
    return res.status(400).json(errorFormatted(error));
  }
};
