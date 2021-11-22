module.exports = (error) => {
  const reworkedError = error.details.map((detail) => ({ name: detail.message, description: detail.path.join('.') }));
  return reworkedError;
};
