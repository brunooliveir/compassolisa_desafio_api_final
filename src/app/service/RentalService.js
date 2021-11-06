const RentalRepository = require('../repository/RentalRepository')
const MatrizLargerThanOneError = require('../errors/rental/MatrizLargerThanOneError')
const RentalParameterNotFound = require('../errors/rental/RentalParameterNotFound')

class RentalService {
    async create(payload) {
        let matrizDeclared = 0
        payload.endereco.forEach(element => {
            if (!element.isFilial) {
                matrizDeclared += 1
            }
        })
        if (matrizDeclared > 1) {
            throw new MatrizLargerThanOneError(matrizDeclared)
        }
        const locadora = await RentalRepository.create(payload)
        return locadora
    }

    async checkLocadoraId(payload) {
        const locadora = await RentalRepository.findOneById(payload)
        return locadora
    }

    async checkQuery(payload) {
        Object.keys(payload).forEach(element => {
            if (element == 'cep' ||
                element == 'logradouro' ||
                element == 'bairro' ||
                element == 'number' ||
                element == 'localidade' ||
                element == 'uf' ||
                element == 'isFilial') {
                const valueOfElement = payload[element]
                delete payload[element]
                element = `endereco.${element}`
                const newKeyValue = {
                    [element]: valueOfElement
                }
                Object.assign(payload, newKeyValue)
            }
        })

        if (!!payload.limit) {
            payload.limit = parseInt(payload.limit)
        }
        if (!!payload.offset) {
            payload.offset = parseInt(payload.offset)
            payload.skip = payload.offset
        }
        if (!!payload.offsets) {
            payload.offsets = parseInt(payload.offsets)
            if (!!payload.skip) {
                payload.skip += payload.offsets
            } else {
                payload.skip = payload.offsets
            }
        }
        const locadoras = await RentalRepository.findByQuery(payload)
        const { limit, offset, offsets, skip, ...locadorasWithOutPagination } = payload
        const locadorasTotal = (await RentalRepository.findByQuery(locadorasWithOutPagination)).length
        if (locadorasTotal == 0) {
            throw new RentalParameterNotFound(payload)
        }
        return { locadoras: locadoras, total: locadorasTotal, limit: payload.limit, offset: payload.offset, offsets: payload.offsets }
    }

    async checkLocadoraDelete(id) {
        await RentalRepository.deleteOne(id)
        return
    }

    async checkLocadoraUpdate(id, payload) {
        let matrizDeclared = 0
        payload.endereco.forEach(element => {
            if (!element.isFilial) {
                matrizDeclared += 1
            }
        })
        if (matrizDeclared > 1) {
            throw new MatrizLargerThanOneError(matrizDeclared)
        }
        return await RentalRepository.UpdateOneById(id, payload)
    }



}

module.exports = new RentalService()