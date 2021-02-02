## SMN - Cadastro de Usuários para rede de pastelaria

### Pré-requisitos

Ter previamente instalado em seu ambiente:

> Node.js
> Postgres

### Rodando o projeto

#### 1. Configure a base de dados

> Database: pastry_db
> Usuário: smn_admin
> Senha: admin

*Caso prefira alterar, as configurações da base e de conexão com a base de dados se encontram nos arquivos connection.ts e knexfile.ts*



#### 2. Instale as dependências

No diretório do back [server]e front [web] execute:

> $ npm install



#### 3. Execute a migração

No diretório do back [server] execute o script:

> $ npx knex:migrate



#### 4. Inicie o back e front

**Back** [Porta: 3333]

No diretório do back [server] execute o script:

> $ npm run dev



**Front** [Porta: 3000]

No diretório do front [web] execute o script:

> $ npm start
