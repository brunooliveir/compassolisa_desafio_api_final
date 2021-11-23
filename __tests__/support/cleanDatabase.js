const mongoose = require('mongoose');

const cleanDatabase = async () => {
  const db = mongoose;
  const collections = Object.keys(db.connection.collections);
  await Promise.all(collections.map(async (collection) => db.connection.collections[collection].deleteMany({})));
};

module.exports = cleanDatabase;
