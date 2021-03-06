const dotenv = require('dotenv');

dotenv.config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
});

module.exports = {
  database: {
    secret: process.env.DB_SECRET,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    collection: process.env.DB_COLLECTION,
    url: process.env.DB_URL
  }
};
