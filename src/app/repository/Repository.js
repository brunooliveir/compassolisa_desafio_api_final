const NotFound = require('../errors/NotFound');

class Repository {
  constructor(model) {
    this.model = model;
  }

  formatDescricao(payload) {
    Object.keys(payload).forEach((element) => {
      if (element === 'descricao') {
        const newKeyValue = { 'acessorios.descricao': payload.descricao };
        delete payload.descricao;
        Object.assign(payload, newKeyValue);
      }
    });
  }

  formatEndereco(payload) {
    Object.keys(payload).forEach((element) => {
      if (['cep', 'logradouro', 'bairro', 'number', 'localidade', 'uf', 'isFilial'].includes(element)) {
        const valueOfElement = payload[element];
        delete payload[element];
        const newKeyValue = { [`endereco.${element}`]: valueOfElement };
        Object.assign(payload, newKeyValue);
      }
    });
  }

  async create(payload) {
    return this.model.create(payload);
  }

  async getAll(payload) {
    const { offset, limit, ...query } = payload;
    this.formatEndereco(payload);
    this.formatDescricao(payload);
    const result = await this.model.paginate(query, {
      page: offset ? parseInt(offset, 10) : 0,
      limit: limit ? parseInt(limit, 10) : 100
    });
    if (result.totalDocs === 0) throw new NotFound('of query');
    return result;
  }

  async getById(payload) {
    const finded = await this.model.findById({ _id: payload });
    if (finded == null) throw new NotFound(`id ${payload}`);
    return finded;
  }

  async update(id, payload) {
    const finded = await this.model.findOneAndUpdate({ _id: id }, payload, { returnOriginal: false });
    if (finded == null) throw new NotFound(`id ${id}`);
    return finded;
  }

  async delete(payload) {
    await this.getById(payload);
    return this.model.deleteOne({ _id: payload });
  }
}

module.exports = Repository;
