const Joi = require('joi')
const CnpjBadValue = require('../../errors/rental/CnpjBadValue')

const LIMIT_MINIMUM_STRING_LENGHT = 3
const LIMIT_MAXIMUM_STRING_LENGHT = 150

const LIMIT_MINIMUM_CEP_LENGHT = 3
const LIMIT_MAXIMUM_CEP_LENGHT = 150

const LIMIT_MAXIMUM_CNPJ_STRING_LENGHT = 18

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
                .max(LIMIT_MAXIMUM_CNPJ_STRING_LENGHT)
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

        function checkCNPJ(strCnpjBrute) {
            cnpj = strCnpjBrute.replace(/[^\d]+/g, '')
            if (cnpj == '') {
                throw new CnpjBadValue(strCnpjBrute)
            }
            if (cnpj.length != 14) {
                throw new CnpjBadValue(strCnpjBrute)
            }

            if (cnpj == "00000000000000" ||
                cnpj == "11111111111111" ||
                cnpj == "22222222222222" ||
                cnpj == "33333333333333" ||
                cnpj == "44444444444444" ||
                cnpj == "55555555555555" ||
                cnpj == "66666666666666" ||
                cnpj == "77777777777777" ||
                cnpj == "88888888888888" ||
                cnpj == "99999999999999") {
                throw new CnpjBadValue(strCnpjBrute)
            }

            length = cnpj.length - 2
            numbers = cnpj.substring(0, length)
            digits = cnpj.substring(length)
            sum = 0
            pos = length - 7
            for (i = length; i >= 1; i--) {
                sum += numbers.charAt(length - i) * pos--
                    if (pos < 2) {
                        pos = 9
                    }
            }
            result = sum % 11 < 2 ? 0 : 11 - sum % 11
            if (result != digits.charAt(0)) {
                throw new CnpjBadValue(strCnpjBrute)
            }
            length = length + 1
            numbers = cnpj.substring(0, length)
            sum = 0
            pos = length - 7
            for (i = length; i >= 1; i--) {
                sum += numbers.charAt(length - i) * pos--
                    if (pos < 2) {
                        pos = 9
                    }
            }
            result = sum % 11 < 2 ? 0 : 11 - sum % 11
            if (result != digits.charAt(1)) {
                throw new CnpjBadValue(strCnpjBrute)
            }

            return true
        }

        try {
            const strCnpjBrute = await schema.validate(req.body).value.cnpj
            if (!!strCnpjBrute) {
                if (strCnpjBrute.length <= LIMIT_MAXIMUM_CNPJ_STRING_LENGHT)
                    checkCNPJ(strCnpjBrute)
            }
        } catch (error) {
            return next(error)
        }

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