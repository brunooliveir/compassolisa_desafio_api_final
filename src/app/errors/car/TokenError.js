class TokenError extends Error {
  constructor(token) {
    const message = `Token error: ${token}`;
    super(message);
    this.name = 'Unauthorized';
  }
}

module.exports = TokenError;
