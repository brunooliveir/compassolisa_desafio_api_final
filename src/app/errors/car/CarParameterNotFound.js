class CarParameterNotFound extends Error {
  constructor(parameters) {
    if (parameters.modelo === undefined) {
      parameters.modelo = '';
    }
    if (parameters.cor === undefined) {
      parameters.cor = '';
    }
    if (parameters.ano === undefined) {
      parameters.ano = '';
    }
    if (parameters.descricao === undefined) {
      parameters.descricao = '';
    }
    if (parameters.quantidadePassageiros === undefined) {
      parameters.quantidadePassageiros = '';
    }

    const message = `The car with these parameters:{ modelo: ${parameters.modelo}, cor: ${parameters.cor}, ano: ${parameters.ano}, descricao: ${parameters.descricao}, quantidadePassageiros: ${parameters.quantidadePassageiros}} was not found`;
    super(message);
    this.name = 'Not Found';
    this.idError = 0;
  }
}

module.exports = CarParameterNotFound;
