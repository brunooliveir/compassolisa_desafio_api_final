const RentalService = require('../service/RentalService')
const axios = require('axios')

class RentalController {
    async create(req, res, next) {
        try {
            const address = []
            req.body.endereco.forEach(endereco => {
                address.push(axios.get('https://viacep.com.br/ws/' + endereco.cep + '/json'))
            });
            const addresses = await Promise.all(address)
            const result = await RentalService.create(req.body, addresses)
            return res.status(201).json(result)
        } catch (Error) {
            next(Error)
        }
    }

    async listQuery(req, res, next) {
        try {
            const result = await RentalService.checkQuery(req.query)
            return res.status(200).json({ locadoras: result["locadoras"], total: result["total"], limit: result["limit"], offset: result["offset"], offsets: result["offsets"] })
        } catch (Error) {
            next(Error)
        }
    }

}

module.exports = new RentalController()