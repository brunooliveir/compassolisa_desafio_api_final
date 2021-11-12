const request = require('supertest');
const CarSchema = require('../../src/app/schema/CarSchema');
const PeopleSchema = require('../../src/app/schema/PeopleSchema');
const app = require('../../src/app');
const Database = require('../../src/infra/database/mongo/index');
const authToken = require('../../tools/authForTests');

Database.connect();

beforeAll(async () => {
  await CarSchema.deleteMany();
  await PeopleSchema.deleteMany();
});

beforeEach(async () => {
  await CarSchema.deleteMany();
  await PeopleSchema.deleteMany();
});

afterAll(async () => {
  await CarSchema.deleteMany();
  await PeopleSchema.deleteMany();
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

it('should get a car by params', async () => {
  const token = await authToken.getToken();
  const veiculoTest = {
    modelo: 'GM S10 2.8',
    cor: 'branco',
    ano: 2021,
    acessorios: [{ descricao: 'Ar-condicionado' }, { descricao: 'ABS' }],
    quantidadePassageiros: 5
  };

  const payload = await request(app).post('/api/v1/car/').send(veiculoTest).set('Authorization', `Bearer ${token}`);

  const responseModelo = await request(app)
    .get(`${'/api/v1/car/?modelo='}${payload.body.modelo}`)
    .send()
    .set('Authorization', `Bearer ${token}`);

  expect(responseModelo.status).toBe(200);
  expect(responseModelo.body.veiculos).toEqual(
    expect.arrayContaining([
      {
        _id: payload.body._id,
        cor: veiculoTest.cor,
        quantidadePassageiros: veiculoTest.quantidadePassageiros,
        modelo: veiculoTest.modelo,
        ano: veiculoTest.ano,
        acessorios: [
          { _id: expect.any(String), descricao: veiculoTest.acessorios[0].descricao },
          { _id: expect.any(String), descricao: veiculoTest.acessorios[1].descricao }
        ]
      }
    ])
  );
  expect(responseModelo.body.veiculos).toEqual(
    expect.arrayContaining([
      {
        _id: expect.any(String),
        cor: expect.any(String),
        quantidadePassageiros: expect.any(Number),
        modelo: expect.any(String),
        ano: expect.any(Number),
        acessorios: [
          { _id: expect.any(String), descricao: expect.any(String) },
          { _id: expect.any(String), descricao: expect.any(String) }
        ]
      }
    ])
  );

  const responseCor = await request(app)
    .get(`${'/api/v1/car/?cor='}${payload.body.cor}`)
    .send()
    .set('Authorization', `Bearer ${token}`);

  expect(responseCor.status).toBe(200);
  expect(responseCor.body.veiculos).toEqual(
    expect.arrayContaining([
      {
        _id: payload.body._id,
        cor: veiculoTest.cor,
        quantidadePassageiros: veiculoTest.quantidadePassageiros,
        modelo: veiculoTest.modelo,
        ano: veiculoTest.ano,
        acessorios: [
          { _id: expect.any(String), descricao: veiculoTest.acessorios[0].descricao },
          { _id: expect.any(String), descricao: veiculoTest.acessorios[1].descricao }
        ]
      }
    ])
  );
  expect(responseCor.body.veiculos).toEqual(
    expect.arrayContaining([
      {
        _id: expect.any(String),
        cor: expect.any(String),
        quantidadePassageiros: expect.any(Number),
        modelo: expect.any(String),
        ano: expect.any(Number),
        acessorios: [
          { _id: expect.any(String), descricao: expect.any(String) },
          { _id: expect.any(String), descricao: expect.any(String) }
        ]
      }
    ])
  );

  const responseAno = await request(app)
    .get(`${'/api/v1/car/?ano='}${payload.body.ano}`)
    .send()
    .set('Authorization', `Bearer ${token}`);

  expect(responseAno.status).toBe(200);
  expect(responseAno.body.veiculos).toEqual(
    expect.arrayContaining([
      {
        _id: payload.body._id,
        cor: veiculoTest.cor,
        quantidadePassageiros: veiculoTest.quantidadePassageiros,
        modelo: veiculoTest.modelo,
        ano: veiculoTest.ano,
        acessorios: [
          { _id: expect.any(String), descricao: veiculoTest.acessorios[0].descricao },
          { _id: expect.any(String), descricao: veiculoTest.acessorios[1].descricao }
        ]
      }
    ])
  );
  expect(responseAno.body.veiculos).toEqual(
    expect.arrayContaining([
      {
        _id: expect.any(String),
        cor: expect.any(String),
        quantidadePassageiros: expect.any(Number),
        modelo: expect.any(String),
        ano: expect.any(Number),
        acessorios: [
          { _id: expect.any(String), descricao: expect.any(String) },
          { _id: expect.any(String), descricao: expect.any(String) }
        ]
      }
    ])
  );

  const responseDescricaoPrimeira = await request(app)
    .get(`${'/api/v1/car/?descricao='}${payload.body.acessorios[0].descricao}`)
    .send()
    .set('Authorization', `Bearer ${token}`);

  expect(responseDescricaoPrimeira.status).toBe(200);
  expect(responseDescricaoPrimeira.body.veiculos).toEqual(
    expect.arrayContaining([
      {
        _id: payload.body._id,
        cor: veiculoTest.cor,
        quantidadePassageiros: veiculoTest.quantidadePassageiros,
        modelo: veiculoTest.modelo,
        ano: veiculoTest.ano,
        acessorios: [
          { _id: expect.any(String), descricao: veiculoTest.acessorios[0].descricao },
          { _id: expect.any(String), descricao: veiculoTest.acessorios[1].descricao }
        ]
      }
    ])
  );
  expect(responseDescricaoPrimeira.body.veiculos).toEqual(
    expect.arrayContaining([
      {
        _id: expect.any(String),
        cor: expect.any(String),
        quantidadePassageiros: expect.any(Number),
        modelo: expect.any(String),
        ano: expect.any(Number),
        acessorios: [
          { _id: expect.any(String), descricao: expect.any(String) },
          { _id: expect.any(String), descricao: expect.any(String) }
        ]
      }
    ])
  );

  const responseDescricaoSegunda = await request(app)
    .get(`${'/api/v1/car/?descricao='}${payload.body.acessorios[1].descricao}`)
    .send()
    .set('Authorization', `Bearer ${token}`);

  expect(responseDescricaoSegunda.status).toBe(200);
  expect(responseDescricaoSegunda.body.veiculos).toEqual(
    expect.arrayContaining([
      {
        _id: payload.body._id,
        cor: veiculoTest.cor,
        quantidadePassageiros: veiculoTest.quantidadePassageiros,
        modelo: veiculoTest.modelo,
        ano: veiculoTest.ano,
        acessorios: [
          { _id: expect.any(String), descricao: veiculoTest.acessorios[0].descricao },
          { _id: expect.any(String), descricao: veiculoTest.acessorios[1].descricao }
        ]
      }
    ])
  );
  expect(responseDescricaoSegunda.body.veiculos).toEqual(
    expect.arrayContaining([
      {
        _id: expect.any(String),
        cor: expect.any(String),
        quantidadePassageiros: expect.any(Number),
        modelo: expect.any(String),
        ano: expect.any(Number),
        acessorios: [
          { _id: expect.any(String), descricao: expect.any(String) },
          { _id: expect.any(String), descricao: expect.any(String) }
        ]
      }
    ])
  );
});

it('should delete a car by id', async () => {
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
    .delete(`/api/v1/car/${payload.body._id}`)
    .send()
    .set('Authorization', `Bearer ${token}`);

  expect(response.status).toBe(204);
});

it('dont should delete a car by id', async () => {
  const token = await authToken.getToken();
  const veiculoTest = {
    modelo: 'GM S10 2.8',
    cor: 'branco',
    ano: 2021,
    acessorios: [{ descricao: 'Ar-condicionado' }],
    quantidadePassageiros: 5
  };

  const payload = await request(app).post('/api/v1/car/').send(veiculoTest).set('Authorization', `Bearer ${token}`);

  await request(app).delete(`/api/v1/car/${payload.body._id}`).send().set('Authorization', `Bearer ${token}`);

  const response = await request(app)
    .delete(`/api/v1/car/${payload.body._id}`)
    .send()
    .set('Authorization', `Bearer ${token}`);

  expect(response.status).toBe(404);
});

it('should update a car by id', async () => {
  const token = await authToken.getToken();
  const veiculoTestOriginal = {
    modelo: 'GM S10 2.8',
    cor: 'branco',
    ano: 2021,
    acessorios: [{ descricao: 'Ar-condicionado' }],
    quantidadePassageiros: 5
  };

  const veiculoTestUpdate = {
    modelo: 'GM S10 2.8',
    cor: 'azul',
    ano: 2005,
    acessorios: [{ descricao: 'ABS' }, { descricao: 'GPS' }],
    quantidadePassageiros: 4
  };

  const payload = await request(app)
    .post('/api/v1/car/')
    .send(veiculoTestOriginal)
    .set('Authorization', `Bearer ${token}`);

  const response = await request(app)
    .put(`/api/v1/car/${payload.body._id}`)
    .send(veiculoTestUpdate)
    .set('Authorization', `Bearer ${token}`);

  expect(response.status).toBe(200);
  expect(response.body).toEqual({
    _id: payload.body._id,
    cor: veiculoTestUpdate.cor,
    quantidadePassageiros: veiculoTestUpdate.quantidadePassageiros,
    modelo: veiculoTestUpdate.modelo,
    ano: veiculoTestUpdate.ano,
    acessorios: [
      { _id: expect.any(String), descricao: veiculoTestUpdate.acessorios[0].descricao },
      { _id: expect.any(String), descricao: veiculoTestUpdate.acessorios[1].descricao }
    ]
  });
  expect(response.body).toEqual({
    _id: expect.any(String),
    cor: expect.any(String),
    quantidadePassageiros: expect.any(Number),
    modelo: expect.any(String),
    ano: expect.any(Number),
    acessorios: [
      { _id: expect.any(String), descricao: expect.any(String) },
      { _id: expect.any(String), descricao: expect.any(String) }
    ]
  });
});

it('dont should update a car by id', async () => {
  const token = await authToken.getToken();
  const veiculoTestModelUnique = {
    modelo: 'GM S10 2.8',
    cor: 'verde',
    ano: 2008,
    acessorios: [{ descricao: 'Rádio' }],
    quantidadePassageiros: 6
  };

  const veiculoTestOriginal = {
    modelo: 'AD X22 2.8',
    cor: 'branco',
    ano: 2021,
    acessorios: [{ descricao: 'Ar-condicionado' }],
    quantidadePassageiros: 5
  };

  const veiculoTestUpdate = {
    modelo: 'GM S10 2.8',
    cor: 'azul',
    ano: 2005,
    acessorios: [{ descricao: 'ABS' }, { descricao: 'GPS' }],
    quantidadePassageiros: 4
  };

  await request(app).post('/api/v1/car/').send(veiculoTestModelUnique).set('Authorization', `Bearer ${token}`);

  const payload = await request(app)
    .post('/api/v1/car/')
    .send(veiculoTestOriginal)
    .set('Authorization', `Bearer ${token}`);

  const response = await request(app)
    .put(`/api/v1/car/${payload.body._id}`)
    .send(veiculoTestUpdate)
    .set('Authorization', `Bearer ${token}`);

  expect(response.status).toBe(409);
});

it('should update a acessorio of car by id', async () => {
  const token = await authToken.getToken();
  const veiculoTestOriginal = {
    modelo: 'GM S10 2.8',
    cor: 'verde',
    ano: 2008,
    acessorios: [{ descricao: 'Rádio' }, { descricao: 'ABS' }, { descricao: 'Ar-Condicionado' }],
    quantidadePassageiros: 6
  };

  const payload = await request(app)
    .post('/api/v1/car/')
    .send(veiculoTestOriginal)
    .set('Authorization', `Bearer ${token}`);

  const response1 = await request(app)
    .patch(`/api/v1/car/${payload.body._id}/acessorios/${payload.body.acessorios[0]._id}`)
    .send({ descricao: 'DVD-player' })
    .set('Authorization', `Bearer ${token}`);
  expect(response1.status).toBe(200);
  expect(response1.body.acessorios[0].descricao).toBe('DVD-player');
  expect(response1.body.acessorios[1].descricao).toBe('ABS');
  expect(response1.body.acessorios[2].descricao).toBe('Ar-Condicionado');
  expect(typeof response1.body.acessorios[0].descricao).toBe('string');
  expect(typeof response1.body.acessorios[1].descricao).toBe('string');
  expect(typeof response1.body.acessorios[2].descricao).toBe('string');
});

it('dont should update a acessorio of car by id', async () => {
  const token = await authToken.getToken();
  const veiculoTestOriginal = {
    modelo: 'GM S10 2.8',
    cor: 'verde',
    ano: 2008,
    acessorios: [{ descricao: 'Rádio' }, { descricao: 'ABS' }, { descricao: 'Ar-Condicionado' }],
    quantidadePassageiros: 6
  };

  const veiculoTestWithAnotherId = {
    modelo: 'Ford Pinto',
    cor: 'amarelo',
    ano: 1970,
    acessorios: [{ descricao: 'Diskman' }, { descricao: 'ABS' }, { descricao: 'Ar-Condicionado' }],
    quantidadePassageiros: 4
  };

  const payload = await request(app)
    .post('/api/v1/car/')
    .send(veiculoTestOriginal)
    .set('Authorization', `Bearer ${token}`);

  const payloadWithAnotherId = await request(app)
    .post('/api/v1/car/')
    .send(veiculoTestWithAnotherId)
    .set('Authorization', `Bearer ${token}`);

  const response1 = await request(app)
    .patch(`/api/v1/car/${payloadWithAnotherId.body._id}/acessorios/${payload.body.acessorios[0]._id}`) // id and acessorios[0]._id not match
    .send({ descricao: 'DVD-player' })
    .set('Authorization', `Bearer ${token}`);

  expect(response1.status).toBe(404); // route not can be /api/v1/car/"id of car x"/acessorios/"id of acessorio of car y"

  const response2 = await request(app)
    .patch(`/api/v1/car/${payload.body._id}/acessorios/${payload.body.acessorios[0]._id}`) // acessorios[0] = 'Rádio'
    .send({ descricao: 'ABS' }) // acessorios[1] == 'ABS'
    .set('Authorization', `Bearer ${token}`);

  expect(response2.status).toBe(409); // acessorios not can be ['ABS','ABS','Ar-Condicionado']

  const response3 = await request(app)
    .patch(`/api/v1/car/${payload.body._id}/acessorios/${payload.body.acessorios[0]._id}`) // acessorios[0] = 'Rádio'
    .send({ descricao: 'ABS       ' }) // acessorios[1] == 'ABS'
    .set('Authorization', `Bearer ${token}`);

  expect(response3.status).toBe(409); // acessorios not can be ['ABS       ','ABS','Ar-Condicionado']
});
