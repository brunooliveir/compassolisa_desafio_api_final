const Joi = require('joi')

const LIMIT_MINIMUM_STRING_LENGHT = 3
const LIMIT_MAXIMUM_STRING_LENGHT = 150

const LIMIT_MINIMUM_CEP_LENGHT = 3
const LIMIT_MAXIMUM_CEP_LENGHT = 150

const LIMIT_MINIMUM_ARRAY_LENGHT = 1

const LIMIT_MINIMUM_ENDERECO_NUMBER = 0

module.exports = async(req, res, next) => {
    try {
        const schema = Joi.object({
            nome: Joi.string()
                .trim()
                .min(LIMIT_MINIMUM_STRING_LENGHT)
                .max(LIMIT_MAXIMUM_STRING_LENGHT)
                .required(),
            cnpj: Joi.string()
                .trim()
                .min(14)
                .max(18)
                .required(),
            atividades: Joi.string()
                .trim()
                .min(LIMIT_MINIMUM_STRING_LENGHT)
                .max(LIMIT_MAXIMUM_STRING_LENGHT)
                .required(),
            endereco: Joi.array()
                .items(
                    Joi.object({
                        cep: Joi.string()
                            .trim()
                            .min(LIMIT_MINIMUM_CEP_LENGHT)
                            .max(LIMIT_MAXIMUM_CEP_LENGHT)
                            .lowercase()
                            .required(),
                        number: Joi.number()
                            .greater(LIMIT_MINIMUM_ENDERECO_NUMBER)
                            .required(),
                        complemento: Joi.string()
                            .trim()
                            .max(LIMIT_MAXIMUM_CEP_LENGHT)
                            .lowercase(),
                        isFilial: Joi.boolean()
                            .required()
                    }))
                .min(LIMIT_MINIMUM_ARRAY_LENGHT)
                .unique()
                .required(),
        })

        const { error } = await schema.validate(req.body, { abortEarly: false })
        if (error) throw error
        return next()
    } catch (error) {
        const reworkedError = []
        if (error.details.length > 1) {
            error.details.forEach(element => {
                reworkedError[error.details.indexOf(element)] = { description: element.path[0], name: element.message }
            })
        } else {
            return res.status(400).json({ description: error.details[0].path[0], name: error.details[0].message })
        }

        return res.status(400).json(reworkedError)
    }
}