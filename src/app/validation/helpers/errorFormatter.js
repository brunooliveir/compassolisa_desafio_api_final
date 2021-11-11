module.exports = (error) => {
  const reworkedError = [];
  if (error.details.length > 1) {
    error.details.forEach((element) => {
      reworkedError[error.details.indexOf(element)] = { description: element.context.label, name: element.message };
    });
  }
  return { description: error.details[0].context.label, name: error.details[0].message };
};
