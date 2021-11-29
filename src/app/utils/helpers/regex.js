const idRegex = /[0-9A-Fa-f]/;
const numberRegex = /[0-9A-Za-z]/;
const placaRegex = /[A-Z]{3}[0-9][0-9A-Z][0-9]{2}/;
const dinheiroRegex = /^[1-9]\d{0,2}(\.\d{3})*,\d{2}$/;

module.exports = { idRegex, numberRegex, placaRegex, dinheiroRegex };
