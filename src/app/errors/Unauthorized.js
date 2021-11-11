class Unauthorized extends Error {
  constructor(value) {
    const message = `${value}`;
    super(message);
    this.description = 'Unauthorized';
    this.name = 'Unauthorized';
    this.status = 401;
  }
}

module.exports = Unauthorized;
