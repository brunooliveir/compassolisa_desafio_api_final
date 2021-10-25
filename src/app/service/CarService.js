const CarRepository = require('../repository/CarRepository')

class CarService {
    async create(payload) {
        try {
            const veiculo = await CarRepository.create(payload)
            const STATUS_SUCCESS = 201
            return { statusCode: STATUS_SUCCESS, veiculo: veiculo }
        } catch (error) {
            const STATUS_FAIL = 400
            return { statusCode: STATUS_FAIL, veiculo: error }
        }
    }

    async checkVeiculoId(id) {
        try {
            const veiculo = await CarRepository.findOneById(id)
            const STATUS_SUCCESS = 200
            if (veiculo == null) {
                throw new Error('car id not found')
            }
            return { statusCode: STATUS_SUCCESS, veiculo: veiculo }

        } catch (Error) {
            const STATUS_FAIL = 404

            return { statusCode: STATUS_FAIL, veiculo: { Error: 'car id not found' } }

        }
    }

    async checkQuery(query) {
        try {
            const LIMIT = 100
            const OFFSET = 0
            const OFFSETS = 0
            const veiculos = await CarRepository.findByQuery(query, LIMIT, OFFSET, OFFSETS)
            const STATUS_SUCCESS = 200
            if (veiculos.length == 0) {
                throw new Error('the car with these parameters was not found')
            }
            return { statusCode: STATUS_SUCCESS, veiculos: veiculos, total: veiculos.length, limit: LIMIT, offset: OFFSET, offsets: OFFSETS }
        } catch (Error) {
            const STATUS_FAIL = 404
            return { statusCode: STATUS_FAIL, veiculos: { Error: 'the car with these parameters was not found' } }

        }
    }

    async checkVeiculoDelete(id, checkedVeiculoId) {
        try {
            const STATUS_SUCCESS = 204
            if (checkedVeiculoId["statusCode"] == 404) {
                throw new Error('car id not found')
            }
            await CarRepository.deleteOne(id)
            return { statusCode: STATUS_SUCCESS, }
        } catch (Error) {
            const STATUS_FAIL = 404
            return { statusCode: STATUS_FAIL, veiculo: { Error: 'car id not found' } }
        }
    }

    async checkVeiculoUpdate(id, body, checkedVeiculoId) {
        try {

            if (checkedVeiculoId["statusCode"] == 404) {
                throw new Error('car id not found')
            }

        } catch (Error) {
            const STATUS_FAIL = 404
            return { statusCode: STATUS_FAIL, veiculo: { Error: 'car id not found' } }
        }


        try {
            const STATUS_SUCCESS = 201
            const veiculo = await CarRepository.findOneById(id)
            Object.keys(body).forEach(element => {
                if (veiculo[element] == undefined) {
                    throw new Error('parameter not found')
                }
            });
            Object.assign(veiculo, body)
            veiculo.save()
            return { statusCode: STATUS_SUCCESS, veiculo: { veiculo } }
        } catch (Error) {
            const STATUS_FAIL = 404
            return { statusCode: STATUS_FAIL, veiculo: { Error: 'parameter not found' } }
        }
    }

}

module.exports = new CarService()