const request = require('supertest');
const app = require('../../../src/app');
const Database = require('../../../src/infra/database/mongo/index');

Database.connect();

afterAll(async () => {
  Database.disconnect();
});

it('should get a people by params', async () => {
  const pessoaTest = {
    nome: 'joao ciclano',
    cpf: '286.162.557-02',
    data_nascimento: '15/05/2001',
    email: 'joaociclano@email.com',
    senha: 'senhaforteConfia',
    habilitado: 'sim'
  };

  const payload = await request(app).post('/api/v1/people/').send(pessoaTest);

  const responseNome = await request(app).get(`${'/api/v1/people/?nome='}${payload.body.nome}`).send();

  expect(responseNome.status).toBe(200);
  expect(responseNome.body.pessoas).toEqual(
    expect.arrayContaining([
      {
        _id: payload.body._id,
        cpf: pessoaTest.cpf,
        data_nascimento: '2001-05-15T03:00:00.000Z',
        email: pessoaTest.email,
        habilitado: pessoaTest.habilitado,
        nome: pessoaTest.nome
      }
    ])
  );
  expect(responseNome.body.pessoas).toEqual(
    expect.arrayContaining([
      {
        _id: expect.any(String),
        cpf: expect.any(String),
        data_nascimento: expect.any(String),
        email: expect.any(String),
        habilitado: expect.any(String),
        nome: expect.any(String)
      }
    ])
  );

  const responseCpf = await request(app).get(`${'/api/v1/people/?cpf='}${payload.body.cpf}`).send();

  expect(responseCpf.status).toBe(200);
  expect(responseCpf.body.pessoas).toEqual(
    expect.arrayContaining([
      {
        _id: payload.body._id,
        cpf: pessoaTest.cpf,
        data_nascimento: '2001-05-15T03:00:00.000Z',
        email: pessoaTest.email,
        habilitado: pessoaTest.habilitado,
        nome: pessoaTest.nome
      }
    ])
  );
  expect(responseCpf.body.pessoas).toEqual(
    expect.arrayContaining([
      {
        _id: expect.any(String),
        cpf: expect.any(String),
        data_nascimento: expect.any(String),
        email: expect.any(String),
        habilitado: expect.any(String),
        nome: expect.any(String)
      }
    ])
  );

  const responseData_nascimento = await request(app).get('/api/v1/people/?data_nascimento=15/05/2001').send();

  expect(responseData_nascimento.status).toBe(200);
  expect(responseData_nascimento.body.pessoas).toEqual(
    expect.arrayContaining([
      {
        _id: payload.body._id,
        cpf: pessoaTest.cpf,
        data_nascimento: '2001-05-15T03:00:00.000Z',
        email: pessoaTest.email,
        habilitado: pessoaTest.habilitado,
        nome: pessoaTest.nome
      }
    ])
  );
  expect(responseData_nascimento.body.pessoas).toEqual(
    expect.arrayContaining([
      {
        _id: expect.any(String),
        cpf: expect.any(String),
        data_nascimento: expect.any(String),
        email: expect.any(String),
        habilitado: expect.any(String),
        nome: expect.any(String)
      }
    ])
  );

  const responseEmail = await request(app).get(`${'/api/v1/people/?email='}${payload.body.email}`).send();

  expect(responseEmail.status).toBe(200);
  expect(responseEmail.body.pessoas).toEqual(
    expect.arrayContaining([
      {
        _id: payload.body._id,
        cpf: pessoaTest.cpf,
        data_nascimento: '2001-05-15T03:00:00.000Z',
        email: pessoaTest.email,
        habilitado: pessoaTest.habilitado,
        nome: pessoaTest.nome
      }
    ])
  );
  expect(responseEmail.body.pessoas).toEqual(
    expect.arrayContaining([
      {
        _id: expect.any(String),
        cpf: expect.any(String),
        data_nascimento: expect.any(String),
        email: expect.any(String),
        habilitado: expect.any(String),
        nome: expect.any(String)
      }
    ])
  );

  const responseHabilitado = await request(app)
    .get(`${'/api/v1/people/?habilitado='}${payload.body.habilitado}`)
    .send();
  expect(responseHabilitado.status).toBe(200);
  expect(responseHabilitado.body.pessoas).toEqual(
    expect.arrayContaining([
      {
        _id: payload.body._id,
        cpf: pessoaTest.cpf,
        data_nascimento: '2001-05-15T03:00:00.000Z',
        email: pessoaTest.email,
        habilitado: pessoaTest.habilitado,
        nome: pessoaTest.nome
      }
    ])
  );
  expect(responseHabilitado.body.pessoas).toEqual(
    expect.arrayContaining([
      {
        _id: expect.any(String),
        cpf: expect.any(String),
        data_nascimento: expect.any(String),
        email: expect.any(String),
        habilitado: expect.any(String),
        nome: expect.any(String)
      }
    ])
  );
});

it('dont should get a people by params', async () => {
  const pessoaTest = {
    nome: 'joao ciclano',
    cpf: '286.162.557-02',
    data_nascimento: '15/05/2001',
    email: 'joaociclano@email.com',
    senha: 'senhaforteConfia',
    habilitado: 'sim'
  };

  const payload = await request(app).post('/api/v1/people/').send(pessoaTest);

  const responseNome = await request(app).get(`${'/api/v1/people/?nome='}${payload.body.nome}aa`).send();

  expect(responseNome.status).toBe(404);
  expect(responseNome.body.description).toBe('Not Found');
  expect(responseNome.body.name).toBe('Value of query not found');
});
