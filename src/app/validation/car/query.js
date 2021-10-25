const Joi = require('joi')

module.exports = async(req, res, next) => {
    try {
        const query = Joi.object({
            id: Joi.number().min(0).required()
        })

        const { error } = query.validate(req.params, { abortEarl: true })
        if (error) throw error
        return next()
    } catch (error) {
        return res.status(400).json(error)
    }
}