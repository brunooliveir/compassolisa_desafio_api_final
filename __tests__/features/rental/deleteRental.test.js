const request = require('supertest');
const app = require('../../../src/app');
const Database = require('../../../src/infra/database/mongo/index');

Database.connect();

afterAll(async () => {
  Database.disconnect();
});

it('should delete a rental by id', async () => {
  const locadoraTest = {
    nome: 'Localiza Rent a Car',
    cnpj: '16.670.085/0001-55',
    atividades: 'Aluguel de Carros E Gestão de Frotas',
    endereco: [
      {
        cep: '96200-200',
        number: '1234',
        complemento: 'Muro A',
        isFilial: true
      }
    ]
  };

  const payload = await request(app).post('/api/v1/rental/').send(locadoraTest);

  const response = await request(app).delete(`/api/v1/rental/${payload.body._id}`).send();

  expect(response.status).toBe(204);
});

it('dont should delete a rental by id', async () => {
  const locadoraTest = {
    nome: 'Localiza Rent a Car',
    cnpj: '16.670.085/0001-55',
    atividades: 'Aluguel de Carros E Gestão de Frotas',
    endereco: [
      {
        cep: '96200-200',
        number: '1234',
        complemento: 'Muro A',
        isFilial: true
      }
    ]
  };

  const payload = await request(app).post('/api/v1/rental/').send(locadoraTest);

  await request(app).delete(`/api/v1/rental/${payload.body._id}`).send();

  const response = await request(app).delete(`/api/v1/rental/${payload.body._id}`).send();

  expect(response.status).toBe(404);
});
