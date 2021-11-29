const request = require('supertest');
const app = require('../../../src/app');
const Database = require('../../../src/infra/database/mongo/index');

Database.connect();

afterAll(async () => {
  Database.disconnect();
});

it('should get a people by id', async () => {
  const pessoaTest = {
    nome: 'joão ciclano',
    cpf: '286.162.557-02',
    data_nascimento: '15/05/2001',
    email: 'joãociclano@email.com',
    senha: 'senhaforteConfia',
    habilitado: 'sim'
  };

  const payload = await request(app).post('/api/v1/people/').send(pessoaTest);

  const response = await request(app).get(`/api/v1/people/${payload.body._id}`).send();

  expect(response.status).toBe(200);
  expect(response.body).toEqual({
    _id: payload.body._id,
    cpf: pessoaTest.cpf,
    data_nascimento: '2001-05-15T03:00:00.000Z',
    email: pessoaTest.email,
    habilitado: pessoaTest.habilitado,
    nome: pessoaTest.nome
  });
  expect(response.body).toEqual({
    _id: expect.any(String),
    cpf: expect.any(String),
    data_nascimento: expect.any(String),
    email: expect.any(String),
    habilitado: expect.any(String),
    nome: expect.any(String)
  });
});

it('should reject id, bad argument', async () => {
  const pessoaTest = {
    _id: '617fc14c0066e3a486717t55' // have 't', invalid Id
  };

  const response = await request(app).get(`/api/v1/people/${pessoaTest._id}`).send();

  expect(response.status).toBe(400);
});

it('should reject id, Id not found', async () => {
  const pessoaTest = {
    _id: '617fc14c0066e3a486717d55'
  };

  const response = await request(app).get(`/api/v1/people/${pessoaTest._id}`).send();

  expect(response.status).toBe(404);
});
