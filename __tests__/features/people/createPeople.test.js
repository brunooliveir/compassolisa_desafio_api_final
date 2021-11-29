const request = require('supertest');
const app = require('../../../src/app');
const Database = require('../../../src/infra/database/mongo/index');

Database.connect();

afterAll(async () => {
  Database.disconnect();
});

it('should create a people', async () => {
  const pessoaTest = {
    nome: 'joão ciclano',
    cpf: '286.162.557-02',
    data_nascimento: '15/05/2001',
    email: 'joãociclano@email.com',
    senha: 'senhaforteConfia',
    habilitado: 'sim'
  };

  const response = await request(app).post('/api/v1/people/').send(pessoaTest);

  expect(response.status).toBe(201);
  expect(response.body).toEqual({
    _id: expect.any(String),
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

it('dont should create a people', async () => {
  const pessoaTest = {
    nome: 'joão ciclano',
    cpf: '286.162.557-02',
    data_nascimento: '15/05/2001',
    email: 'joãociclano@email.com',
    senha: 'senhaforteConfia',
    habilitado: 'sim'
  };

  await request(app).post('/api/v1/people/').send(pessoaTest);

  const response = await request(app).post('/api/v1/people/').send(pessoaTest);

  expect(response.status).toBe(409);
});
