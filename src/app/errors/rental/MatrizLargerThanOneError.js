class MatrizLargerThanOneError extends Error {
  constructor(numberOfMatriz) {
    const message = `Has ${numberOfMatriz} Matrizes declareds`;
    super(message);
    this.name = 'Conflict';
  }
}

module.exports = MatrizLargerThanOneError;
