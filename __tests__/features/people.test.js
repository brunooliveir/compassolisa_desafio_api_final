const PeopleSchema = require('../../src/app/schema/PeopleSchema')
const request = require('supertest')
const app = require('../../src/app')
const Database = require('../../src/infra/database/mongo/index')

Database.connect()

beforeAll(async() => {
    await PeopleSchema.deleteMany()
})

beforeEach(async() => {
    await PeopleSchema.deleteMany()
})

afterAll(async() => {
    await PeopleSchema.deleteMany()
    Database.disconnect()
})

it('should create a people', async() => {
    const pessoaTest = {
        nome: "joão ciclano",
        cpf: "286.162.557-02",
        data_nascimento: "15/05/2001",
        email: "joãociclano@email.com",
        senha: "senhaforteConfia",
        habilitado: "sim"
    }

    const response = await request(app)
        .post('/api/v1/people/')
        .send(pessoaTest)
    expect(response.status).toBe(201)
    expect(response.body.nome).toBe(pessoaTest.nome)
    expect(response.body.cpf).toBe(pessoaTest.cpf)
    expect(response.body.data_nascimento).toBe(pessoaTest.data_nascimento)
    expect(response.body.senha).toBe(undefined)
    expect(response.body.habilitado).toBe(pessoaTest.habilitado)
})

it('dont should create a people', async() => {
    const pessoaTest = {
        nome: "joão ciclano",
        cpf: "286.162.557-02",
        data_nascimento: "15/05/2001",
        email: "joãociclano@email.com",
        senha: "senhaforteConfia",
        habilitado: "sim"
    }

    await request(app)
        .post('/api/v1/people/')
        .send(pessoaTest)

    const response = await request(app)
        .post('/api/v1/people/')
        .send(pessoaTest)

    expect(response.status).toBe(400)
})

it('should get a people by id', async() => {
    const pessoaTest = {
        nome: "joão ciclano",
        cpf: "286.162.557-02",
        data_nascimento: "15/05/2001",
        email: "joãociclano@email.com",
        senha: "senhaforteConfia",
        habilitado: "sim"
    }

    const payload = await request(app)
        .post('/api/v1/people/')
        .send(pessoaTest)

    const response = await request(app)
        .get('/api/v1/people/' + payload.body._id)
        .send()

    expect(response.status).toBe(200)
    expect(response.body.nome).toBe(pessoaTest.nome)
    expect(response.body.cpf).toBe(pessoaTest.cpf)
    expect(response.body.data_nascimento).toBe(pessoaTest.data_nascimento)
    expect(response.body.senha).toBe(undefined)
    expect(response.body.habilitado).toBe(pessoaTest.habilitado)
})

it('should reject id, bad argument', async() => {
    const pessoaTest = {
        _id: '617fc14c0066e3a486717t55' //have 't', invalid Id
    }

    const response = await request(app)
        .get('/api/v1/people/' + pessoaTest._id)
        .send()

    expect(response.status).toBe(400)
})

it('should reject id, Id not found', async() => {
    const pessoaTest = {
        _id: '617fc14c0066e3a486717d55'
    }

    const response = await request(app)
        .get('/api/v1/people/' + pessoaTest._id)
        .send()

    expect(response.status).toBe(404)
})

it('should get a people by params', async() => {
    const pessoaTest = {
        nome: "joão ciclano",
        cpf: "286.162.557-02",
        data_nascimento: "15/05/2001",
        email: "joãociclano@email.com",
        senha: "senhaforteConfia",
        habilitado: "sim"
    }

    const payload = await request(app)
        .post('/api/v1/people/')
        .send(pessoaTest)


    const responseNome = await request(app)
        .get('/api/v1/people/' + '?nome=' + payload.body.nome)
        .send()

    expect(responseNome.status).toBe(200)
    expect(responseNome.body.pessoas[0].nome).toBe(pessoaTest.nome)
    expect(responseNome.body.pessoas[0].cpf).toBe(pessoaTest.cpf)
    expect(responseNome.body.pessoas[0].data_nascimento).toBe(pessoaTest.data_nascimento)
    expect(responseNome.body.pessoas[0].email).toBe(pessoaTest.email)
    expect(responseNome.body.pessoas[0].senha).toBe(undefined)
    expect(responseNome.body.pessoas[0].habilitado).toBe(pessoaTest.habilitado)

    const responseCpf = await request(app)
        .get('/api/v1/people/' + '?cpf=' + payload.body.cpf)
        .send()

    expect(responseCpf.status).toBe(200)
    expect(responseCpf.body.pessoas[0].nome).toBe(pessoaTest.nome)
    expect(responseCpf.body.pessoas[0].cpf).toBe(pessoaTest.cpf)
    expect(responseCpf.body.pessoas[0].data_nascimento).toBe(pessoaTest.data_nascimento)
    expect(responseCpf.body.pessoas[0].email).toBe(pessoaTest.email)
    expect(responseCpf.body.pessoas[0].senha).toBe(undefined)
    expect(responseCpf.body.pessoas[0].habilitado).toBe(pessoaTest.habilitado)


    const responseData_nascimento = await request(app)
        .get('/api/v1/people/' + '?data_nascimento=' + payload.body.data_nascimento.replace('/', '.').replace('/', '.'))
        .send()

    expect(responseData_nascimento.status).toBe(200)
    expect(responseData_nascimento.body.pessoas[0].nome).toBe(pessoaTest.nome)
    expect(responseData_nascimento.body.pessoas[0].cpf).toBe(pessoaTest.cpf)
    expect(responseData_nascimento.body.pessoas[0].data_nascimento).toBe(pessoaTest.data_nascimento)
    expect(responseData_nascimento.body.pessoas[0].email).toBe(pessoaTest.email)
    expect(responseData_nascimento.body.pessoas[0].senha).toBe(undefined)
    expect(responseData_nascimento.body.pessoas[0].habilitado).toBe(pessoaTest.habilitado)

    const responseEmail = await request(app)
        .get('/api/v1/people/' + '?email=' + payload.body.email)
        .send()

    expect(responseEmail.status).toBe(200)
    expect(responseEmail.body.pessoas[0].nome).toBe(pessoaTest.nome)
    expect(responseEmail.body.pessoas[0].cpf).toBe(pessoaTest.cpf)
    expect(responseEmail.body.pessoas[0].data_nascimento).toBe(pessoaTest.data_nascimento)
    expect(responseEmail.body.pessoas[0].email).toBe(pessoaTest.email)
    expect(responseEmail.body.pessoas[0].senha).toBe(undefined)
    expect(responseEmail.body.pessoas[0].habilitado).toBe(pessoaTest.habilitado)

    const responseHabilitado = await request(app)
        .get('/api/v1/people/' + '?habilitado=' + payload.body.habilitado)
        .send()
    expect(responseHabilitado.status).toBe(200)
    expect(responseHabilitado.body.pessoas[0].nome).toBe(pessoaTest.nome)
    expect(responseHabilitado.body.pessoas[0].cpf).toBe(pessoaTest.cpf)
    expect(responseHabilitado.body.pessoas[0].data_nascimento).toBe(pessoaTest.data_nascimento)
    expect(responseHabilitado.body.pessoas[0].email).toBe(pessoaTest.email)
    expect(responseHabilitado.body.pessoas[0].senha).toBe(undefined)
    expect(responseHabilitado.body.pessoas[0].habilitado).toBe(pessoaTest.habilitado)
})

it('should delete a people by id', async() => {
    const pessoaTest = {
        nome: "joão ciclano",
        cpf: "286.162.557-02",
        data_nascimento: "15/05/2001",
        email: "joãociclano@email.com",
        senha: "senhaforteConfia",
        habilitado: "sim"
    }

    const payload = await request(app)
        .post('/api/v1/people/')
        .send(pessoaTest)

    const response = await request(app)
        .delete('/api/v1/people/' + payload.body._id)
        .send()

    expect(response.status).toBe(204)
})

it('dont should delete a people by id', async() => {
    const pessoaTest = {
        nome: "joão ciclano",
        cpf: "286.162.557-02",
        data_nascimento: "15/05/2001",
        email: "joãociclano@email.com",
        senha: "senhaforteConfia",
        habilitado: "sim"
    }

    const payload = await request(app)
        .post('/api/v1/people/')
        .send(pessoaTest)

    await request(app)
        .delete('/api/v1/people/' + payload.body._id)
        .send()

    const response = await request(app)
        .delete('/api/v1/people/' + payload.body._id)
        .send()

    expect(response.status).toBe(404)
})

it('should update a people by id', async() => {
    const pessoaTestOriginal = {
        nome: "joão ciclano",
        cpf: "286.162.557-02",
        data_nascimento: "15/05/2001",
        email: "joãociclano@email.com",
        senha: "senhaforteConfia",
        habilitado: "sim"
    }

    const pessoaTestUpdate = {
        nome: "Alvaro",
        cpf: "286.162.557-02",
        data_nascimento: "15/05/2001",
        email: "joãociclano@email.com",
        senha: "senhaforteConfia",
        habilitado: "não"
    }

    const payload = await request(app)
        .post('/api/v1/people/')
        .send(pessoaTestOriginal)

    const response = await request(app)
        .put('/api/v1/people/' + payload.body._id)
        .send(pessoaTestUpdate)

    expect(response.status).toBe(201)
    expect(response.body.nome).toBe(pessoaTestUpdate.nome)
    expect(response.body.cpf).toBe(pessoaTestUpdate.cpf)
    expect(response.body.data_nascimento).toBe(pessoaTestUpdate.data_nascimento)
    expect(response.body.email).toBe(pessoaTestUpdate.email)
    expect(response.body.senha).toBe(undefined)
    expect(response.body.habilitado).toBe(pessoaTestUpdate.habilitado)
})

it('dont should update a people by id', async() => {
    const pessoaTestCpfUnique = {
        nome: "Fabio ciclano",
        cpf: "286.162.557-02",
        data_nascimento: "15/05/2001",
        email: "fabiociclano@email.com",
        senha: "senhaforteConfia",
        habilitado: "sim"
    }

    const pessoaTestEmailUnique = {
        nome: "Pedro ciclano",
        cpf: "513.411.618-03",
        data_nascimento: "15/05/2001",
        email: "pedrociclano@email.com",
        senha: "senhaforteConfia",
        habilitado: "sim"
    }

    const pessoaTestOriginal = {
        nome: "joão ciclano",
        cpf: "100.610.762-28",
        data_nascimento: "15/05/2001",
        email: "joãociclano@email.com",
        senha: "senhaforteConfia",
        habilitado: "sim"
    }

    const pessoaTestUpdate1 = {
        nome: "joão ciclano",
        cpf: "513.411.618-03",
        data_nascimento: "15/05/2001",
        email: "joãociclano@email.com",
        senha: "senhaforteConfia",
        habilitado: "não"
    }

    const pessoaTestUpdate2 = {
        nome: "joão ciclano",
        cpf: "100.610.762-28",
        data_nascimento: "15/05/2001",
        email: "pedrociclano@email.com",
        senha: "senhaforteConfia",
        habilitado: "sim"
    }

    await request(app)
        .post('/api/v1/people/')
        .send(pessoaTestCpfUnique)

    await request(app)
        .post('/api/v1/people/')
        .send(pessoaTestEmailUnique)

    const payload = await request(app)
        .post('/api/v1/people/')
        .send(pessoaTestOriginal)

    const response1 = await request(app)
        .put('/api/v1/people/' + payload.body._id)
        .send(pessoaTestUpdate1)

    expect(response1.status).toBe(400)

    const response2 = await request(app)
        .put('/api/v1/people/' + payload.body._id)
        .send(pessoaTestUpdate2)

    expect(response2.status).toBe(400)
})


it('should authenticate a people', async() => {
    const pessoaTest = {
        nome: "Jorge ciclano",
        cpf: "218.237.400-06",
        data_nascimento: "15/05/2001",
        email: "jorgeciclano@email.com",
        senha: "senhaforteConfia",
        habilitado: "sim"
    }

    const dataPessoaTest = {
        email: "jorgeciclano@email.com",
        senha: "senhaforteConfia",
        habilitado: "sim"
    }

    await request(app)
        .post('/api/v1/people/')
        .send(pessoaTest)

    const response = await request(app)
        .post('/api/v1/authenticate/')
        .send(dataPessoaTest)

    expect(response.status).toBe(201)
    expect(response.body.email).toBe(pessoaTest.email)
    expect(response.body.habilitado).toBe(pessoaTest.habilitado)

    expect(response.body.nome).toBe(undefined)
    expect(response.body.cpf).toBe(undefined)
    expect(response.body.data_nascimento).toBe(undefined)
    expect(response.body.senha).toBe(undefined)

})