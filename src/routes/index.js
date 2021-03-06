const { Router } = require('express');
const car = require('./car.router');
const people = require('./people.router');
const authenticate = require('./authenticate.router');
const apidocs = require('./api-docs.router');
const rental = require('./rental.router');
const rentalReserve = require('./rental.reserve.router');
const rentalFleet = require('./rental.fleet.router');

module.exports = (server) => {
  server.use((req, res, next) => {
    apidocs(server, new Router());
    car(server, new Router());
    people(server, new Router());
    authenticate(server, new Router());
    rental(server, new Router());
    rentalReserve(server, new Router());
    rentalFleet(server, new Router());
    next();
  });
};
