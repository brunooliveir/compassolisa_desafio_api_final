const request = require('supertest');
const app = require('../../../src/app');
const Database = require('../../../src/infra/database/mongo/index');
const authToken = require('../../../tools/authForTests');

Database.connect();

afterAll(async () => {
  Database.disconnect();
});

it('should get a car by id', async () => {
  const token = await authToken.getToken();
  const veiculoTest = {
    modelo: 'GM S10 2.8',
    cor: 'branco',
    ano: 2021,
    acessorios: [{ descricao: 'Ar-condicionado' }],
    quantidadePassageiros: 5
  };

  const payload = await request(app).post('/api/v1/car/').send(veiculoTest).set('Authorization', `Bearer ${token}`);

  const response = await request(app)
    .get(`/api/v1/car/${payload.body._id}`)
    .send()
    .set('Authorization', `Bearer ${token}`);

  expect(response.status).toBe(200);
  expect(response.body).toEqual({
    _id: payload.body._id,
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

it('should reject id, bad argument', async () => {
  const token = await authToken.getToken();
  const veiculoTest = {
    _id: '617fc14c0066e3a486717t55' // have 't', invalid Id
  };

  const response = await request(app)
    .get(`/api/v1/car/${veiculoTest._id}`)
    .send()
    .set('Authorization', `Bearer ${token}`);

  expect(response.status).toBe(400);
});

it('should reject id, Id not found', async () => {
  const token = await authToken.getToken();
  const veiculoTest = {
    _id: '617fc14c0066e3a486717d55'
  };

  const response = await request(app)
    .get(`/api/v1/car/${veiculoTest._id}`)
    .send()
    .set('Authorization', `Bearer ${token}`);

  expect(response.status).toBe(404);
});
