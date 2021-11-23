const request = require('supertest');
const app = require('../../src/app');
const Database = require('../../src/infra/database/mongo/index');

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

it('should delete a people by id', async () => {
  const pessoaTest = {
    nome: 'joão ciclano',
    cpf: '286.162.557-02',
    data_nascimento: '15/05/2001',
    email: 'joãociclano@email.com',
    senha: 'senhaforteConfia',
    habilitado: 'sim'
  };

  const payload = await request(app).post('/api/v1/people/').send(pessoaTest);

  const response = await request(app).delete(`/api/v1/people/${payload.body._id}`).send();

  expect(response.status).toBe(204);
});

it('dont should delete a people by id', async () => {
  const pessoaTest = {
    nome: 'joão ciclano',
    cpf: '286.162.557-02',
    data_nascimento: '15/05/2001',
    email: 'joãociclano@email.com',
    senha: 'senhaforteConfia',
    habilitado: 'sim'
  };

  const payload = await request(app).post('/api/v1/people/').send(pessoaTest);

  await request(app).delete(`/api/v1/people/${payload.body._id}`).send();

  const response = await request(app).delete(`/api/v1/people/${payload.body._id}`).send();

  expect(response.status).toBe(404);
});

it('should update a people by id', async () => {
  const pessoaTestOriginal = {
    nome: 'joão ciclano',
    cpf: '286.162.557-02',
    data_nascimento: '15/05/2001',
    email: 'joãociclano@email.com',
    senha: 'senhaforteConfia',
    habilitado: 'sim'
  };

  const pessoaTestUpdate = {
    nome: 'Alvaro',
    cpf: '286.162.557-02',
    data_nascimento: '15/05/2001',
    email: 'joãociclano@email.com',
    senha: 'senhaforteConfia',
    habilitado: 'não'
  };

  const payload = await request(app).post('/api/v1/people/').send(pessoaTestOriginal);

  const response = await request(app).put(`/api/v1/people/${payload.body._id}`).send(pessoaTestUpdate);

  expect(response.status).toBe(200);
  expect(response.body).toEqual({
    _id: payload.body._id,
    cpf: pessoaTestUpdate.cpf,
    data_nascimento: '2001-05-15T03:00:00.000Z',
    email: pessoaTestUpdate.email,
    habilitado: pessoaTestUpdate.habilitado,
    nome: pessoaTestUpdate.nome
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

it('dont should update a people by id', async () => {
  const pessoaTestCpfUnique = {
    nome: 'Fabio ciclano',
    cpf: '286.162.557-02',
    data_nascimento: '15/05/2001',
    email: 'fabiociclano@email.com',
    senha: 'senhaforteConfia',
    habilitado: 'sim'
  };

  const pessoaTestEmailUnique = {
    nome: 'Pedro ciclano',
    cpf: '513.411.618-03',
    data_nascimento: '15/05/2001',
    email: 'pedrociclano@email.com',
    senha: 'senhaforteConfia',
    habilitado: 'sim'
  };

  const pessoaTestOriginal = {
    nome: 'joão ciclano',
    cpf: '100.610.762-28',
    data_nascimento: '15/05/2001',
    email: 'joãociclano@email.com',
    senha: 'senhaforteConfia',
    habilitado: 'sim'
  };

  const pessoaTestUpdate1 = {
    nome: 'joão ciclano',
    cpf: '513.411.618-03',
    data_nascimento: '15/05/2001',
    email: 'joãociclano@email.com',
    senha: 'senhaforteConfia',
    habilitado: 'não'
  };

  const pessoaTestUpdate2 = {
    nome: 'joão ciclano',
    cpf: '100.610.762-28',
    data_nascimento: '15/05/2001',
    email: 'pedrociclano@email.com',
    senha: 'senhaforteConfia',
    habilitado: 'sim'
  };

  await request(app).post('/api/v1/people/').send(pessoaTestCpfUnique);

  await request(app).post('/api/v1/people/').send(pessoaTestEmailUnique);

  const payload = await request(app).post('/api/v1/people/').send(pessoaTestOriginal);

  const response1 = await request(app).put(`/api/v1/people/${payload.body._id}`).send(pessoaTestUpdate1);

  expect(response1.status).toBe(409);

  const response2 = await request(app).put(`/api/v1/people/${payload.body._id}`).send(pessoaTestUpdate2);

  expect(response2.status).toBe(409);

  const response3 = await request(app).put(`/api/v1/people/617fc14c0066e3a486717d55`).send(pessoaTestUpdate2);

  expect(response3.status).toBe(404);
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
