# Teste Code Talent Pool

Este projeto consiste em um sistema de cadastro de produtos, lojas e relação entre produtos e lojas, utilizando Docker, Nest.js e Angular.

## Tecnologias Utilizadas

- Docker
- Nest.js
- Angular

## Como Rodar o Projeto

### Backend (Nest.js)

1. Clone este repositório
2. Acesse a pasta `backend` e rode o comando `docker-compose up -d` para iniciar o container do banco de dados Postgres
3. Acesse a pasta `backend` e rode o comando `npm install` para instalar as dependências
4. Crie um arquivo `.env` na pasta raiz do backend
5. Rode o comando `npm run start:dev` para iniciar o servidor Nest.js

### Frontend (Angular)

1. Clone este repositório
2. Acesse a pasta `frontend` e rode o comando `npm install` para instalar as dependências
3. Crie um arquivo `environment.ts` na pasta `src/environments`, seguindo o exemplo do arquivo `environment.example.ts`, preenchendo as variáveis de ambiente necessárias
4. Rode o comando `ng serve` para iniciar o servidor de desenvolvimento do Angular

## Funcionalidades

- Cadastro, edição e exclusão de produtos
- Cadastro, edição e exclusão de lojas
- Relacionamento entre produtos e lojas
- Listagem de produtos disponíveis em cada loja

## Exemplo de Uso

Após rodar o projeto, acesse a URL `http://localhost:4200` para acessar a interface do sistema e começar a cadastrar produtos e lojas.

## Contribuição

Sinta-se à vontade para contribuir com o projeto, abrindo issues e pull requests.

## Licença

Este projeto está licenciado sob a licença MIT.
