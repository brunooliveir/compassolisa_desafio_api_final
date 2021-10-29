const Joi = require('joi')

const LIMIT_MINIMUM_CAR_YEAR = 1949
const LIMIT_MAXIMUM_CAR_YEAR = 2023

const LIMIT_MINIMUM_STRING_LENGHT = 2
const LIMIT_MAXIMUM_STRING_LENGHT = 150

const LIMIT_MINIMUM_ARRAY_LENGHT = 1
const LIMIT_MAXIMUM_ARRAY_LENGHT = 50

const LIMIT_MINIMUM_PASSENGER_NUMBER = 0
const LIMIT_MAXIMUM_PASSENGER_NUMBER = 20

module.exports = async(req, res, next) => {
    try {
        const schema = Joi.object({
            modelo: Joi.string()
                .min(LIMIT_MINIMUM_STRING_LENGHT)
                .max(LIMIT_MAXIMUM_STRING_LENGHT)
                .required(),
            cor: Joi.string()
                .min(LIMIT_MINIMUM_STRING_LENGHT)
                .max(LIMIT_MAXIMUM_STRING_LENGHT)
                .required(),
            ano: Joi.number()
                .greater(LIMIT_MINIMUM_CAR_YEAR)
                .less(LIMIT_MAXIMUM_CAR_YEAR)
                .required(),
            acessorios: Joi.array()
                .items(
                    Joi.object({
                        descricao: Joi.string()
                            .min(LIMIT_MINIMUM_STRING_LENGHT)
                            .max(LIMIT_MAXIMUM_STRING_LENGHT)
                            .required()
                    }))
                .min(LIMIT_MINIMUM_ARRAY_LENGHT)
                .max(LIMIT_MAXIMUM_ARRAY_LENGHT)
                .unique()
                .required(),
            quantidadePassageiros: Joi.number()
                .greater(LIMIT_MINIMUM_PASSENGER_NUMBER)
                .less(LIMIT_MAXIMUM_PASSENGER_NUMBER)
                .required()
        })

        const { error } = await schema.validate(req.body, { abortEarly: false })
        if (error) throw error
        return next()
    } catch (error) {
        return res.status(400).json(error)
    }
}