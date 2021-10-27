const Joi = require('joi')

module.exports = async(req, res, next) => {
    try {
        const id = Joi.object({
            id: Joi.number().min(0).required()
        })

        const { error } = id.validate(req.params, { abortEarly: false })
        if (error) throw error
        return next()
    } catch (error) {
        return res.status(400).json(error)
    }
}