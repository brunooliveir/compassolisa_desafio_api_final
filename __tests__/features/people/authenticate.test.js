const request = require('supertest');
const app = require('../../../src/app');
const Database = require('../../../src/infra/database/mongo/index');

Database.connect();

afterAll(async () => {
  Database.disconnect();
});

it('should authenticate a people', async () => {
  const pessoaTest = {
    nome: 'Jorge ciclano',
    cpf: '218.237.400-06',
    data_nascimento: '15/05/2001',
    email: 'jorgeciclano@email.com',
    senha: 'senhaforteConfia',
    habilitado: 'sim'
  };

  const dataPessoaTest = {
    email: 'jorgeciclano@email.com',
    senha: 'senhaforteConfia',
    habilitado: 'sim'
  };

  await request(app).post('/api/v1/people/').send(pessoaTest);

  const response = await request(app).post('/api/v1/authenticate/').send(dataPessoaTest);

  expect(response.status).toBe(201);
  expect(response.body).toEqual({
    email: pessoaTest.email,
    habilitado: pessoaTest.habilitado,
    token: expect.any(String)
  });
  expect(response.body).toEqual({
    email: expect.any(String),
    habilitado: expect.any(String),
    token: expect.any(String)
  });
});

it('dont should authenticate a people', async () => {
  const pessoaTest = {
    nome: 'Jorge ciclano',
    cpf: '218.237.400-06',
    data_nascimento: '15/05/2001',
    email: 'jorgeciclano@email.com',
    senha: 'senhaforteConfia',
    habilitado: 'sim'
  };

  const dataPessoaTest = {
    email: 'jorgeciclano@email.com',
    senha: 'senhaErrada',
    habilitado: 'sim'
  };

  await request(app).post('/api/v1/people/').send(pessoaTest);

  const response = await request(app).post('/api/v1/authenticate/').send(dataPessoaTest);

  expect(response.status).toBe(400);
  expect(response.body.description).toBe('Bad Request');
  expect(response.body.name).toBe('Invalid email or password');
});
