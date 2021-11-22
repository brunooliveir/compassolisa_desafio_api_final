const addressesSerialize = (endereco) => ({
  cep: endereco.cep,
  logradouro: endereco.logradouro,
  complemento: endereco.complemento,
  bairro: endereco.bairro,
  number: endereco.number,
  localidade: endereco.localidade,
  uf: endereco.uf
});

const serialize = ({ _id, nome, cnpj, atividades, endereco }) => ({
  _id,
  nome,
  cnpj,
  atividades,
  endereco: endereco.map(addressesSerialize)
});

const paginateSerialize = ({ docs, limit, totalDocs, pagingCounter, totalPages }) => ({
  locadoras: docs.map(serialize),
  limit,
  total: totalDocs,
  offset: pagingCounter,
  offsets: totalPages
});

module.exports = { serialize, paginateSerialize };
