const express = require('express');
const cors = require('cors');
const header = require('./header');
const router = require('./routes');
const errors = require('./app/middlewares/errors');
require('./infra/database/mongo').connect();

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(header);
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use(errors);
  }

  routes() {
    router(this.server);
  }
}

module.exports = new App().server;
