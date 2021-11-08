const serialize = ({ _id, nome, cnpj, atividades, endereco }) => {
    return {
        _id,
        nome,
        cnpj,
        atividades,
        endereco: endereco.map(addressesSerialize)
    }
}

const addressesSerialize = (endereco) => {
    return {
        cep: endereco.cep,
        logradouro: endereco.logradouro,
        complemento: endereco.complemento,
        bairro: endereco.bairro,
        number: endereco.number,
        localidade: endereco.localidade,
        uf: endereco.uf
    }
}

const paginateSerialize = ({ locadoras, limit, total, offset, offsets }) => {
    return {
        locadoras: locadoras.map(serialize),
        limit,
        total,
        offset,
        offsets
    }
}

module.exports = { serialize, paginateSerialize }