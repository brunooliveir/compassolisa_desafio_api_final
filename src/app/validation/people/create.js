const Joi = require('joi')

const LIMIT_MINIMUM_NOME_STRING_LENGHT = 5
const LIMIT_MAXIMUM_NOME_STRING_LENGHT = 50

const LIMIT_MINIMUM_SENHA_STRING_LENGHT = 6
const LIMIT_MAXIMUM_SENHA_STRING_LENGHT = 50

const LIMIT_MINIMUM_EMAIL_STRING_LENGHT = 5
const LIMIT_MAXIMUM_EMAIL_STRING_LENGHT = 50

const LIMIT_MINIMUM_AGE = 18

module.exports = async(req, res, next) => {
    try {
        const schema = Joi.object({
            nome: Joi.string()
                .min(LIMIT_MINIMUM_NOME_STRING_LENGHT)
                .max(LIMIT_MAXIMUM_NOME_STRING_LENGHT)
                .required(),
            cpf: Joi.string()
                .required(),
            data_nascimento: Joi.date()
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

        function checkCPF(strCPF) {
            var sum;
            var remainder;
            sum = 0;
            if (strCPF == "00000000000") return false;

            for (i = 1; i <= 9; i++) sum = sum + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
            remainder = (sum * 10) % 11;

            if ((remainder == 10) || (remainder == 11)) remainder = 0;
            if (remainder != parseInt(strCPF.substring(9, 10))) return false;

            sum = 0;
            for (i = 1; i <= 10; i++) sum = sum + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
            remainder = (sum * 10) % 11;

            if ((remainder == 10) || (remainder == 11)) remainder = 0;
            if (remainder != parseInt(strCPF.substring(10, 11))) return false;
            return true;
        }


        try {
            var strCpfBrute = await schema.validate(req.body).value.cpf
            if (strCpfBrute != undefined) {
                var strCPF = await strCpfBrute.replace(".", "").replace(".", "").replace("-", "")
                if (!checkCPF(strCPF)) {
                    throw new error('invalid CPF')
                }
            }
        } catch (error) {
            return res.status(400).json({ error: 'invalid CPF' })
        }

        try {
            const today = new Date()
            const date_of_birth = new Date(await schema.validate(req.body).value.data_nascimento)
            var age

            if (today.getMonth() >= date_of_birth.getMonth()) {
                if (today.getDate() >= (date_of_birth.getDate() + 1)) {
                    age = today.getFullYear() - (date_of_birth.getFullYear() + 1)
                } else {
                    age = today.getFullYear() - (date_of_birth.getFullYear())
                }

            } else {
                age = today.getFullYear() - (date_of_birth.getFullYear())
            }

            if (age < LIMIT_MINIMUM_AGE) {
                throw new error('age under 18 years')
            }
        } catch (error) {
            return res.status(400).json({ error: 'age under 18 years' })
        }


        const { error } = await schema.validate(req.body, { abortEarl: true })
        if (error) throw error
        return next()
    } catch (error) {
        return res.status(400).json(error)
    }
}