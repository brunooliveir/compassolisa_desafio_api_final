const serialize = ({ _id, nome, cpf, data_nascimento, email, habilitado }) => {
    return { _id, nome, cpf, data_nascimento, email, habilitado }
}

const paginateSerialize = ({ pessoas, limit, total, offset, offsets }) => {
    return {
        pessoas: pessoas.map(serialize),
        limit,
        total,
        offset,
        offsets
    }
}

module.exports = { serialize, paginateSerialize }