const request = require('supertest');
const app = require('../../src/app');
const Database = require('../../src/infra/database/mongo/index');

Database.connect();

afterAll(async () => {
  Database.disconnect();
});

it('should create a rental', async () => {
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

  const response = await request(app).post('/api/v1/rental/').send(locadoraTest);
  expect(response.status).toBe(201);
  expect(response.body).toEqual({
    _id: expect.any(String),
    nome: locadoraTest.nome,
    cnpj: locadoraTest.cnpj,
    atividades: locadoraTest.atividades,
    endereco: [
      {
        bairro: expect.any(String),
        cep: locadoraTest.endereco[0].cep,
        complemento: expect.any(String),
        localidade: expect.any(String),
        logradouro: expect.any(String),
        number: locadoraTest.endereco[0].number,
        uf: expect.any(String)
      }
    ]
  });
  expect(response.body).toEqual({
    _id: expect.any(String),
    nome: expect.any(String),
    cnpj: expect.any(String),
    atividades: expect.any(String),
    endereco: [
      {
        bairro: expect.any(String),
        cep: expect.any(String),
        complemento: expect.any(String),
        localidade: expect.any(String),
        logradouro: expect.any(String),
        number: expect.any(String),
        uf: expect.any(String)
      }
    ]
  });
});

it('dont should create a rental', async () => {
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

  await request(app).post('/api/v1/rental/').send(locadoraTest);

  const response = await request(app).post('/api/v1/rental/').send(locadoraTest);

  expect(response.status).toBe(409);
});

it('should get a rental by id', async () => {
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

  const response = await request(app).get(`/api/v1/rental/${payload.body._id}`).send();

  expect(response.status).toBe(200);
  expect(response.body).toEqual({
    _id: payload.body._id,
    nome: locadoraTest.nome,
    cnpj: locadoraTest.cnpj,
    atividades: locadoraTest.atividades,
    endereco: [
      {
        bairro: payload.body.endereco[0].bairro,
        cep: locadoraTest.endereco[0].cep,
        complemento: payload.body.endereco[0].complemento,
        localidade: payload.body.endereco[0].localidade,
        logradouro: payload.body.endereco[0].logradouro,
        number: locadoraTest.endereco[0].number,
        uf: payload.body.endereco[0].uf
      }
    ]
  });
  expect(response.body).toEqual({
    _id: expect.any(String),
    nome: expect.any(String),
    cnpj: expect.any(String),
    atividades: expect.any(String),
    endereco: [
      {
        bairro: expect.any(String),
        cep: expect.any(String),
        complemento: expect.any(String),
        localidade: expect.any(String),
        logradouro: expect.any(String),
        number: expect.any(String),
        uf: expect.any(String)
      }
    ]
  });
});

it('should reject id, bad argument', async () => {
  const locadoraTest = {
    _id: '617fc14c0066e3a486717t55' // have 't', invalid Id
  };
  const response = await request(app).get(`/api/v1/rental/${locadoraTest._id}`).send();

  expect(response.status).toBe(400);
});

it('should reject id, Id not found', async () => {
  const locadoraTest = {
    _id: '617fc14c0066e3a486717d55'
  };

  const response = await request(app).get(`/api/v1/rental/${locadoraTest._id}`).send();

  expect(response.status).toBe(404);
});

it('should get a rental by params', async () => {
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

  const responseNome = await request(app).get(`${'/api/v1/rental/?nome='}${payload.body.nome}`).send();

  expect(responseNome.status).toBe(200);
  expect(responseNome.body.locadoras).toEqual(
    expect.arrayContaining([
      {
        _id: payload.body._id,
        nome: locadoraTest.nome,
        cnpj: locadoraTest.cnpj,
        atividades: locadoraTest.atividades,
        endereco: [
          {
            bairro: payload.body.endereco[0].bairro,
            cep: locadoraTest.endereco[0].cep,
            complemento: payload.body.endereco[0].complemento,
            localidade: payload.body.endereco[0].localidade,
            logradouro: payload.body.endereco[0].logradouro,
            number: locadoraTest.endereco[0].number,
            uf: payload.body.endereco[0].uf
          }
        ]
      }
    ])
  );
  expect(responseNome.body.locadoras).toEqual(
    expect.arrayContaining([
      {
        _id: expect.any(String),
        nome: expect.any(String),
        cnpj: expect.any(String),
        atividades: expect.any(String),
        endereco: [
          {
            bairro: expect.any(String),
            cep: expect.any(String),
            complemento: expect.any(String),
            localidade: expect.any(String),
            logradouro: expect.any(String),
            number: expect.any(String),
            uf: expect.any(String)
          }
        ]
      }
    ])
  );

  const responseCnpj = await request(app).get(`${'/api/v1/rental/?cnpj='}${payload.body.cnpj}`).send();

  expect(responseCnpj.status).toBe(200);
  expect(responseCnpj.body.locadoras).toEqual(
    expect.arrayContaining([
      {
        _id: payload.body._id,
        nome: locadoraTest.nome,
        cnpj: locadoraTest.cnpj,
        atividades: locadoraTest.atividades,
        endereco: [
          {
            bairro: payload.body.endereco[0].bairro,
            cep: locadoraTest.endereco[0].cep,
            complemento: payload.body.endereco[0].complemento,
            localidade: payload.body.endereco[0].localidade,
            logradouro: payload.body.endereco[0].logradouro,
            number: locadoraTest.endereco[0].number,
            uf: payload.body.endereco[0].uf
          }
        ]
      }
    ])
  );
  expect(responseCnpj.body.locadoras).toEqual(
    expect.arrayContaining([
      {
        _id: expect.any(String),
        nome: expect.any(String),
        cnpj: expect.any(String),
        atividades: expect.any(String),
        endereco: [
          {
            bairro: expect.any(String),
            cep: expect.any(String),
            complemento: expect.any(String),
            localidade: expect.any(String),
            logradouro: expect.any(String),
            number: expect.any(String),
            uf: expect.any(String)
          }
        ]
      }
    ])
  );

  const responseCep = await request(app).get(`${'/api/v1/rental/?cep='}${payload.body.endereco[0].cep}`).send();

  expect(responseCep.status).toBe(200);
  expect(responseCep.body.locadoras).toEqual(
    expect.arrayContaining([
      {
        _id: payload.body._id,
        nome: locadoraTest.nome,
        cnpj: locadoraTest.cnpj,
        atividades: locadoraTest.atividades,
        endereco: [
          {
            bairro: payload.body.endereco[0].bairro,
            cep: locadoraTest.endereco[0].cep,
            complemento: payload.body.endereco[0].complemento,
            localidade: payload.body.endereco[0].localidade,
            logradouro: payload.body.endereco[0].logradouro,
            number: locadoraTest.endereco[0].number,
            uf: payload.body.endereco[0].uf
          }
        ]
      }
    ])
  );
  expect(responseCep.body.locadoras).toEqual(
    expect.arrayContaining([
      {
        _id: expect.any(String),
        nome: expect.any(String),
        cnpj: expect.any(String),
        atividades: expect.any(String),
        endereco: [
          {
            bairro: expect.any(String),
            cep: expect.any(String),
            complemento: expect.any(String),
            localidade: expect.any(String),
            logradouro: expect.any(String),
            number: expect.any(String),
            uf: expect.any(String)
          }
        ]
      }
    ])
  );

  const responseNumber = await request(app)
    .get(`${'/api/v1/rental/?number='}${payload.body.endereco[0].number}`)
    .send();

  expect(responseNumber.status).toBe(200);
  expect(responseNumber.body.locadoras).toEqual(
    expect.arrayContaining([
      {
        _id: payload.body._id,
        nome: locadoraTest.nome,
        cnpj: locadoraTest.cnpj,
        atividades: locadoraTest.atividades,
        endereco: [
          {
            bairro: payload.body.endereco[0].bairro,
            cep: locadoraTest.endereco[0].cep,
            complemento: payload.body.endereco[0].complemento,
            localidade: payload.body.endereco[0].localidade,
            logradouro: payload.body.endereco[0].logradouro,
            number: locadoraTest.endereco[0].number,
            uf: payload.body.endereco[0].uf
          }
        ]
      }
    ])
  );
  expect(responseNumber.body.locadoras).toEqual(
    expect.arrayContaining([
      {
        _id: expect.any(String),
        nome: expect.any(String),
        cnpj: expect.any(String),
        atividades: expect.any(String),
        endereco: [
          {
            bairro: expect.any(String),
            cep: expect.any(String),
            complemento: expect.any(String),
            localidade: expect.any(String),
            logradouro: expect.any(String),
            number: expect.any(String),
            uf: expect.any(String)
          }
        ]
      }
    ])
  );

  const responseDescricao = await request(app)
    .get(`${'/api/v1/rental/?descricao='}${payload.body.endereco[0].descricao}`)
    .send();

  expect(responseDescricao.status).toBe(200);
  expect(responseDescricao.body.locadoras).toEqual(
    expect.arrayContaining([
      {
        _id: payload.body._id,
        nome: locadoraTest.nome,
        cnpj: locadoraTest.cnpj,
        atividades: locadoraTest.atividades,
        endereco: [
          {
            bairro: payload.body.endereco[0].bairro,
            cep: locadoraTest.endereco[0].cep,
            complemento: payload.body.endereco[0].complemento,
            localidade: payload.body.endereco[0].localidade,
            logradouro: payload.body.endereco[0].logradouro,
            number: locadoraTest.endereco[0].number,
            uf: payload.body.endereco[0].uf
          }
        ]
      }
    ])
  );
  expect(responseDescricao.body.locadoras).toEqual(
    expect.arrayContaining([
      {
        _id: expect.any(String),
        nome: expect.any(String),
        cnpj: expect.any(String),
        atividades: expect.any(String),
        endereco: [
          {
            bairro: expect.any(String),
            cep: expect.any(String),
            complemento: expect.any(String),
            localidade: expect.any(String),
            logradouro: expect.any(String),
            number: expect.any(String),
            uf: expect.any(String)
          }
        ]
      }
    ])
  );

  const responseComplemento = await request(app)
    .get(`${'/api/v1/rental/?complemento='}${payload.body.endereco[0].complemento}`)
    .send();

  expect(responseComplemento.status).toBe(200);
  expect(responseComplemento.body.locadoras).toEqual(
    expect.arrayContaining([
      {
        _id: payload.body._id,
        nome: locadoraTest.nome,
        cnpj: locadoraTest.cnpj,
        atividades: locadoraTest.atividades,
        endereco: [
          {
            bairro: payload.body.endereco[0].bairro,
            cep: locadoraTest.endereco[0].cep,
            complemento: payload.body.endereco[0].complemento,
            localidade: payload.body.endereco[0].localidade,
            logradouro: payload.body.endereco[0].logradouro,
            number: locadoraTest.endereco[0].number,
            uf: payload.body.endereco[0].uf
          }
        ]
      }
    ])
  );
  expect(responseComplemento.body.locadoras).toEqual(
    expect.arrayContaining([
      {
        _id: expect.any(String),
        nome: expect.any(String),
        cnpj: expect.any(String),
        atividades: expect.any(String),
        endereco: [
          {
            bairro: expect.any(String),
            cep: expect.any(String),
            complemento: expect.any(String),
            localidade: expect.any(String),
            logradouro: expect.any(String),
            number: expect.any(String),
            uf: expect.any(String)
          }
        ]
      }
    ])
  );

  const responseFlilial = await request(app).get('/api/v1/rental/?isFilial=true').send();

  expect(responseFlilial.body.locadoras).toEqual(
    expect.arrayContaining([
      {
        _id: payload.body._id,
        nome: locadoraTest.nome,
        cnpj: locadoraTest.cnpj,
        atividades: locadoraTest.atividades,
        endereco: [
          {
            bairro: payload.body.endereco[0].bairro,
            cep: locadoraTest.endereco[0].cep,
            complemento: payload.body.endereco[0].complemento,
            localidade: payload.body.endereco[0].localidade,
            logradouro: payload.body.endereco[0].logradouro,
            number: locadoraTest.endereco[0].number,
            uf: payload.body.endereco[0].uf
          }
        ]
      }
    ])
  );
  expect(responseFlilial.body.locadoras).toEqual(
    expect.arrayContaining([
      {
        _id: expect.any(String),
        nome: expect.any(String),
        cnpj: expect.any(String),
        atividades: expect.any(String),
        endereco: [
          {
            bairro: expect.any(String),
            cep: expect.any(String),
            complemento: expect.any(String),
            localidade: expect.any(String),
            logradouro: expect.any(String),
            number: expect.any(String),
            uf: expect.any(String)
          }
        ]
      }
    ])
  );
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

it('should update a rental by id', async () => {
  const locadoraTestOriginal = {
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

  const locadoraTestUpdate = {
    nome: 'Localiza Rent a Car',
    cnpj: '16.670.085/0001-55',
    atividades: 'Aluguel de Motos E Gestão de Frotas',
    endereco: [
      {
        cep: '96200-500',
        number: '2235',
        complemento: 'Muro B',
        isFilial: false
      }
    ]
  };

  const payload = await request(app).post('/api/v1/rental/').send(locadoraTestOriginal);

  const response = await request(app).put(`/api/v1/rental/${payload.body._id}`).send(locadoraTestUpdate);

  expect(response.status).toBe(200);
  expect(response.body).toEqual({
    _id: payload.body._id,
    nome: locadoraTestUpdate.nome,
    cnpj: locadoraTestUpdate.cnpj,
    atividades: locadoraTestUpdate.atividades,
    endereco: [
      {
        bairro: response.body.endereco[0].bairro,
        cep: locadoraTestUpdate.endereco[0].cep,
        complemento: response.body.endereco[0].complemento,
        localidade: response.body.endereco[0].localidade,
        logradouro: response.body.endereco[0].logradouro,
        number: locadoraTestUpdate.endereco[0].number,
        uf: response.body.endereco[0].uf
      }
    ]
  });
  expect(response.body).toEqual({
    _id: expect.any(String),
    nome: expect.any(String),
    cnpj: expect.any(String),
    atividades: expect.any(String),
    endereco: [
      {
        bairro: expect.any(String),
        cep: expect.any(String),
        complemento: expect.any(String),
        localidade: expect.any(String),
        logradouro: expect.any(String),
        number: expect.any(String),
        uf: expect.any(String)
      }
    ]
  });
});

it('dont should update a rental by id', async () => {
  const locadoraTestNomeUnique = {
    nome: 'Localiza Rent a Car',
    cnpj: '16.670.085/0001-55',
    atividades: 'Aluguel de Carros E Gestão de Frotas',
    endereco: [
      {
        cep: '96200-500',
        number: '1234',
        complemento: 'Muro A',
        isFilial: true
      }
    ]
  };

  const locadoraTestOriginal = {
    nome: 'Guanabara autolocadora',
    cnpj: '45.320.217/0001-17',
    atividades: 'Aluguel de Motos E Gestão de Frotas',
    endereco: [
      {
        cep: '96200-200',
        number: '1234',
        complemento: 'Muro A',
        isFilial: true
      }
    ]
  };

  const locadoraTestUpdateNameError = {
    nome: 'Localiza Rent a Car',
    cnpj: '53.163.566/0001-09',
    atividades: 'Aluguel de Motos E Gestão de Frotas',
    endereco: [
      {
        cep: '96200-200',
        number: '1234',
        complemento: 'Muro A',
        isFilial: true
      }
    ]
  };

  await request(app).post('/api/v1/rental/').send(locadoraTestNomeUnique);

  const payload = await request(app).post('/api/v1/rental/').send(locadoraTestOriginal);

  const response1 = await request(app).put(`/api/v1/rental/${payload.body._id}`).send(locadoraTestUpdateNameError);

  expect(response1.status).toBe(409);

  const locadoraTestUpdateCnpjError = {
    nome: 'Guanabara autolocadora',
    cnpj: '16.670.085/0001-55',
    atividades: 'Aluguel de Motos E Gestão de Frotas',
    endereco: [
      {
        cep: '96200-200',
        number: '1234',
        complemento: 'Muro A',
        isFilial: true
      }
    ]
  };

  const response2 = await request(app).put(`/api/v1/rental/${payload.body._id}`).send(locadoraTestUpdateCnpjError);

  expect(response2.status).toBe(409);
});
