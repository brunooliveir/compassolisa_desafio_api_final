class RentalParameterNotFound extends Error {
    constructor(parameters) {
        if (parameters.nome == undefined) {
            parameters.nome = ''
        }
        if (parameters.cnpj == undefined) {
            parameters.cnpj = ''
        }
        if (parameters.atividades == undefined) {
            parameters.atividades = ''
        }
        if (parameters['endereco.cep'] == undefined) {
            parameters['endereco.cep'] = ''
        }
        if (parameters['endereco.logradouro'] == undefined) {
            parameters['endereco.logradouro'] = ''
        }
        if (parameters['endereco.complemento'] == undefined) {
            parameters['endereco.complemento'] = ''
        }
        if (parameters['endereco.bairro'] == undefined) {
            parameters['endereco.bairro'] = ''
        }
        if (parameters['endereco.number'] == undefined) {
            parameters['endereco.number'] = ''
        }
        if (parameters['endereco.localidade'] == undefined) {
            parameters['endereco.localidade'] = ''
        }
        if (parameters['endereco.uf'] == undefined) {
            parameters['endereco.uf'] = ''
        }
        if (parameters['endereco.isFilial'] == undefined) {
            parameters['endereco.isFilial'] = ''
        }
        console.log()


        const message = `The rental with these parameters:{ nome: ${parameters.nome},` +
            ` cnpj: ${parameters.cnpj}, atividades: ${parameters.atividades},` +
            ` cep: ${parameters['endereco.cep']}, logradouro: ${parameters['endereco.logradouro']},` +
            ` complemento: ${parameters['endereco.complemento']}, bairro: ${parameters['endereco.bairro']}, number: ${parameters['endereco.number']},` +
            ` localidade: ${parameters['endereco.localidade']}, uf: ${parameters['endereco.uf']}, isFilial: ${parameters['endereco.isFilial']}} was not found`
        super(message)
        this.name = 'Not Found'
    }

}

module.exports = RentalParameterNotFound