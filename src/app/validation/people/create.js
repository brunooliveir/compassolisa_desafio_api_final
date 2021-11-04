const Joi = require('joi').extend(require('@joi/date'))
const CpfBadValue = require('../../errors/people/CpfBadValue')

const LIMIT_MINIMUM_NOME_STRING_LENGHT = 5
const LIMIT_MAXIMUM_NOME_STRING_LENGHT = 50

const LIMIT_MAXIMUM_CPF_STRING_LENGHT = 14

const LIMIT_MINIMUM_SENHA_STRING_LENGHT = 6
const LIMIT_MAXIMUM_SENHA_STRING_LENGHT = 50

const LIMIT_MINIMUM_EMAIL_STRING_LENGHT = 5
const LIMIT_MAXIMUM_EMAIL_STRING_LENGHT = 50


module.exports = async(req, res, next) => {
    try {
        const schema = Joi.object({
            nome: Joi.string()
                .min(LIMIT_MINIMUM_NOME_STRING_LENGHT)
                .max(LIMIT_MAXIMUM_NOME_STRING_LENGHT)
                .trim()
                .required(),
            cpf: Joi.string()
                .max(LIMIT_MAXIMUM_CPF_STRING_LENGHT)
                .required(),
            data_nascimento: Joi.date()
                .format('DD/MM/YYYY')
                .required(),
            email: Joi.string()
                .email()
                .min(LIMIT_MINIMUM_EMAIL_STRING_LENGHT)
                .max(LIMIT_MAXIMUM_EMAIL_STRING_LENGHT)
                .required(),
            senha: Joi.string()
                .min(LIMIT_MINIMUM_SENHA_STRING_LENGHT)
                .max(LIMIT_MAXIMUM_SENHA_STRING_LENGHT)
                .required(),
            habilitado: Joi.string()
                .valid('sim', 'não')
                .required()
        })

        function checkCPF(strCpfBrute) {
            let strCPF = strCpfBrute.replace(".", "").replace(".", "").replace("-", "")
            let sum
            let remainder
            sum = 0

            if (strCPF == "00000000000") {
                throw new CpfBadValue(strCpfBrute)
            }

            for (i = 1; i <= 9; i++) sum = sum + parseInt(strCPF.substring(i - 1, i)) * (11 - i)
            remainder = (sum * 10) % 11

            if ((remainder == 10) || (remainder == 11)) remainder = 0
            if (remainder != parseInt(strCPF.substring(9, 10))) {
                throw new CpfBadValue(strCpfBrute)
            }

            sum = 0;
            for (i = 1; i <= 10; i++) sum = sum + parseInt(strCPF.substring(i - 1, i)) * (12 - i)
            remainder = (sum * 10) % 11

            if ((remainder == 10) || (remainder == 11)) remainder = 0;
            if (remainder != parseInt(strCPF.substring(10, 11))) {
                throw new CpfBadValue(strCpfBrute)
            }
            return true
        }


        try {
            const strCpfBrute = await schema.validate(req.body).value.cpf
            if (!!strCpfBrute) {
                if (strCpfBrute.length <= 14)
                    checkCPF(strCpfBrute)
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
                reworkedError[error.details.indexOf(element)] = { description: error.details.path[0], name: element.message }
            })
        } else {
            return res.status(400).json({ description: error.details[0].path[0], name: error.details[0].message })
        }

        return res.status(400).json(reworkedError)
    }
}