## Express Comunica Web Service

### Visão Geral

Este projeto é um serviço web desenvolvido com o framework `express` em `typescript`, com o objetivo de oferecer uma arquitetura moderna, escalável e de alta qualidade. 

Utilizo o [Prisma](https://www.prisma.io/) como ORM para gerenciar interações com o banco de dados e é configurado para ser executado em contêineres Docker. 
 
A implementação também segue boas práticas de desenvolvimento, com testes automatizados e ferramentas de linting e formatação.

## Funcionalidades Principais 

API RESTful: Endpoints para operações CRUD e outras funcionalidades do serviço.

[Arquitetura DDD](https://martinfowler.com/bliki/DomainDrivenDesign.html) (Domain-Driven Design): Estrutura organizada em domínios para garantir separação de responsabilidades e maior manutenção do código.

[Value Objects](https://martinfowler.com/bliki/ValueObject.html): Implementação de objetos de valor como Email e Password, focando em ortogonalidade e encapsulamento de regras de negócio.

Banco de Dados: Gerenciado com o Prisma, utilizando um modelo de dados definido em prisma/schema.prisma.

Índices no Banco: Adição de índices para otimizar a listagem de usuários por e-mail, devido à alta frequência de consultas.

Execução Contenerizada: Configuração simplificada com Docker Compose.

Testes Automatizados: Implementados com Jest ([swc compiler](https://swc.rs/)) para garantir a qualidade do código.

Padronização de Código: Linting configurado com ESLint e formatação com Prettier.

Configurações Seguras: Gerenciamento de variáveis de ambiente com um arquivo .env.

---
 
## Tecnologias Utilizadas

##### Linguagem e Framework

- TypeScript

- Express

- [Inversify](https://github.com/inversify/InversifyJS) (Injeção de dependência)

##### ORM e Banco de Dados

- Prisma

- PostgreSQL

##### Contêinerização

- Docker

- Docker Compose

##### Testes

- Jest

##### Padronização e Formatação

- ESLint

- Prettier

##### Integração Contínua

- GitHub Actions

##### Logging
- [Morgan](https://www.npmjs.com/package/morgan)
- [Chalk](https://www.npmjs.com/package/chalk)
- [Winston](https://www.npmjs.com/package/winston)

##### Validação
- [Zod](https://www.npmjs.com/package/zod)

#### Security
- [Helmet](https://www.npmjs.com/package/helmet)

---
## Configuração do Ambiente

- Clone o Repositório
  ```sh 
  git clone https://github.com/l-fernandocosta/express-comunica-web-service.git
  ``` 
- Navegue para o diretório
  ```sh
  cd express-comunica-web-service
  ```
- Configure as variáveis
  ```sh
  touch .env
  ```

> Caso tenha instaldo o [nvm](https://github.com/nvm-sh/nvm) em sua máquina, utilize  para recuperar a versão  do node do projeto.

- com NVM:
  ```sh 
    nvm install && npm install
  ```

- sem nvm
  ```sh
  npm install
  ```

- Execute o Banco de Dados (Docker Compose)
  ```sh
  docker-compose up -d
  ```
- Sincronize o prisma
  ```sh
    npx prisma db push
  ```

- Adicione dados utilizando o seed
  ```sh
  npm run seed
  ```
  
- Inicie a aplicação
  ```sh
  npm run dev  
  ```
##### Demais comandos
- Executar os testes:
  ```sh
   npm run test
  ```


----