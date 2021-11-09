class PeopleParameterNotFound extends Error {
  constructor(parameters) {
    if (parameters.nome === undefined) {
      parameters.nome = '';
    }
    if (parameters.cpf === undefined) {
      parameters.cpf = '';
    }
    if (parameters.data_nascimento === undefined) {
      parameters.data_nascimento = '';
    }
    if (parameters.email === undefined) {
      parameters.email = '';
    }
    if (parameters.habilitado === undefined) {
      parameters.habilitado = '';
    }

    const message = `The people with these parameters:{ nome: ${parameters.nome}, cpf: ${parameters.cpf}, data_nascimento: ${parameters.data_nascimento}, email: ${parameters.email}, habilitado: ${parameters.habilitado}} was not found`;
    super(message);
    this.name = 'Not Found';
  }
}

module.exports = PeopleParameterNotFound;
