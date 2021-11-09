class NomeUniqueError extends Error {
  constructor(nome) {
    const message = `Nome ${nome} already in use`;
    super(message);
    this.name = 'Conflict';
  }
}

module.exports = NomeUniqueError;
