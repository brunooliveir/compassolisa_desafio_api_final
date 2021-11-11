const Joi = require('joi');
const { idRegex } = require('./helpers/regex');

module.exports = async (req, res, next) => {
  try {
    const id = Joi.object({
      id: Joi.string().required().id().regex(idRegex)
    });
    const { error } = id.validate(req.params, { abortEarly: false });
    if (error) throw error;
    return next();
  } catch (error) {
    return res.status(400).json(error);
  }
};
