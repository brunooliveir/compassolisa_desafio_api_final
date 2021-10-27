
# compassolisa_desafio_api_final_pt1

O desafio consiste em criar uma aplicação API Rest Full de uma Locadora de veículos.



#Status: Concluído.


## Referente a API

Comando para iniciar a API: **npm start**


# Rotas

## Veiculos


#### Cadastra carro:


```http
  POST | http://localhost:3000/api/v1/car/
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `modelo ` | `string` | **Required, Unique**. |                
| `cor`     | `string` | **Required**. |
| `ano` | `number` | **Required** |                
| `acessorios` | `Array[descricao]` |  **Required** |
| `[descricao]` | `string` | **Required** |
| `quantidadePassageiros` | `number` | **Required** |


#### Consulta todos os veiculos:



```http
  GET | http://localhost:3000/api/v1/car/
```


#### Consulta veiculos por parametros:


```http
  GET | http://localhost:3000/api/v1/car/?paramKey=paramValue
```


#### Consulta um veiculo por Id:



```http
  GET | http://localhost:3000/api/v1/car/:id
```



#### Altera as propriedades de um veiculo, encontrado por Id:



```http
  PUT | http://localhost:3000/api/v1/car/:id
```


| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `modelo ` | `string` |  **Unique**. |                
| `cor`     | `string` | |
| `ano` | `number` | |                
| `acessorios` | `Array[descricao]` |  |
| `[descricao]` | `string` | |
| `quantidadePassageiros` | `number` | |



#### Deleta um veiculo, encontrado por Id:



```http
  DELETE | http://localhost:3000/api/v1/car/:id
```


## Pessoas


#### Cadastra pessoa:


```http
  POST | http://localhost:3000/api/v1/people/
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `nome ` | `string` | **Required**. |                
| `cpf`  | `string` | **Required, Unique**. |
| `data_nascimento` | `date` | **Required** |                
| `email` | `string` |  **Required, Unique** |
| `senha` | `string` | **Required** |
| `habilitado` | `enum[string]` | [sim, não] **Required** |


#### Consulta todas as pessoas:



```http
  GET | http://localhost:3000/api/v1/people/
```


#### Consulta pessoa por parametros:


```http
  GET | http://localhost:3000/api/v1/people/?paramKey=paramValue
```


#### Consulta um pessoa por Id:



```http
  GET | http://localhost:3000/api/v1/people/:id
```



#### Altera as propriedades de uma pessoa, encontrada por Id:



```http
  PUT | http://localhost:3000/api/v1/people/:id
```


| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `nome ` | `string` | **Required**. |                
| `cpf`  | `string` | **Required, Unique**. |
| `data_nascimento` | `date` | **Required** |                
| `email` | `string` |  **Required, Unique** |
| `senha` | `string` | **Required** |
| `habilitado` | `enum[string]` | [sim, não] **Required** |



#### Deleta uma pessoa, encontrado por Id:



```http
  DELETE | http://localhost:3000/api/v1/people/:id
```


## Autenticação


#### Autentica uma pessoa, gera um token de Autenticação:

```http
  POST | http://localhost:3000/api/v1/authenticate/
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |                            
| `email` | `string` |  **Required** |
| `senha` | `string` | **Required** |
| `habilitado` | `enum[string]` | [sim, não] **Required** |
















#### Get item

```http
  GET /api/items/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### add(num1, num2)

Takes two numbers and returns the sum.

