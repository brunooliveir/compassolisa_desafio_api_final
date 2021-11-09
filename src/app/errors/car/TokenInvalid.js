class TokenInvalid extends Error {
  constructor(token) {
    const message = `Token invalid : ${token}`;
    super(message);
    this.name = 'Unauthorized';
  }
}

module.exports = TokenInvalid;
