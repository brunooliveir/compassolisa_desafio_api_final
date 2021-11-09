class ModeloUniqueError extends Error {
  constructor(modelo) {
    const message = `Modelo ${modelo} already in use`;
    super(message);
    this.name = 'Conflict';
  }
}

module.exports = ModeloUniqueError;
