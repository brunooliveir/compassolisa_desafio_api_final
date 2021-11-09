class CepFormatError extends Error {
  constructor() {
    const message = `Invalid CEP format`;
    super(message);
    this.name = 'Bad Request';
  }
}

module.exports = CepFormatError;
