const Joi = require('joi')

const LIMIT_MINIMUM_STRING_LENGHT = 2
const LIMIT_MAXIMUM_STRING_LENGHT = 150

module.exports = async(req, res, next) => {
    try {
        const schema = Joi.object({
            descricao: Joi.string()
                .trim()
                .min(LIMIT_MINIMUM_STRING_LENGHT)
                .max(LIMIT_MAXIMUM_STRING_LENGHT)
                .lowercase()
                .required()
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