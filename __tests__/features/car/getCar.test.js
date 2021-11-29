const request = require('supertest');
const app = require('../../../src/app');
const Database = require('../../../src/infra/database/mongo/index');
const authToken = require('../../../tools/authForTests');

Database.connect();

afterAll(async () => {
  Database.disconnect();
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
