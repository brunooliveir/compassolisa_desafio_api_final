const Joi = require('joi')

module.exports = async(req, res, next) => {
    try {
        const schema = Joi.object({
            modelo: Joi.string().required(),
            cor: Joi.string().required(),
            ano: Joi.number().required(),
            acessorios: Joi.array().required(),
            quantidadePassageiros: Joi.number().required()
        })

        console.log(req.body) //debug

        const { error } = await schema.validate(req.body, { abortEarl: true })
        if (error) throw error
        return next()
    } catch (error) {
        return res.status(400).json(error)
    }
}