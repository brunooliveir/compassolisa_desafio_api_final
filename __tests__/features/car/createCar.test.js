const request = require('supertest');
const app = require('../../../src/app');
const Database = require('../../../src/infra/database/mongo/index');
const authToken = require('../../../tools/authForTests');

Database.connect();

afterAll(async () => {
  Database.disconnect();
});

it('should create a car', async () => {
  const token = await authToken.getToken();
  const veiculoTest = {
    modelo: 'GM S10 2.8',
    cor: 'branco',
    ano: 2021,
    acessorios: [{ descricao: 'Ar-condicionado' }],
    quantidadePassageiros: 5
  };

  const response = await request(app).post('/api/v1/car/').send(veiculoTest).set('Authorization', `Bearer ${token}`);

  expect(response.status).toBe(201);
  expect(response.body).toEqual({
    _id: expect.any(String),
    cor: veiculoTest.cor,
    quantidadePassageiros: veiculoTest.quantidadePassageiros,
    modelo: veiculoTest.modelo,
    ano: veiculoTest.ano,
    acessorios: [{ _id: expect.any(String), descricao: veiculoTest.acessorios[0].descricao }]
  });
  expect(response.body).toEqual({
    _id: expect.any(String),
    cor: expect.any(String),
    quantidadePassageiros: expect.any(Number),
    modelo: expect.any(String),
    ano: expect.any(Number),
    acessorios: [{ _id: expect.any(String), descricao: expect.any(String) }]
  });
});

it('dont should create a car', async () => {
  const token = await authToken.getToken();
  const veiculoTest = {
    modelo: 'GM S10 2.8',
    cor: 'branco',
    ano: 2021,
    acessorios: [{ descricao: 'Ar-condicionado' }],
    quantidadePassageiros: 5
  };

  await request(app).post('/api/v1/car/').send(veiculoTest).set('Authorization', `Bearer ${token}`);

  const response = await request(app).post('/api/v1/car/').send(veiculoTest).set('Authorization', `Bearer ${token}`);

  expect(response.status).toBe(409);
});
