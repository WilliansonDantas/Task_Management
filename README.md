# <img height="20" src="https://raw.githubusercontent.com/innng/innng/master/assets/soulgem-sayaka.gif"/> Task Management API

API para gestão de tarefas multiusuário, suportando múltiplas empresas (tenants), gestão de usuários e tarefas.

## <img height="20" src="https://raw.githubusercontent.com/innng/innng/master/assets/soulgem-sayaka.gif"/>Tecnologias

- **Typescript**
- **Node.js**
- **NestJS**
- **MySQL**
- **TypeORM**
- **JWT para Autenticação**
- **Git para Versionamento**

## <img height="20" src="https://raw.githubusercontent.com/innng/innng/master/assets/soulgem-sayaka.gif"/> Como Rodar

### Pré-requisitos

- Docker
- Docker Compose
- Git

### Passos

1. Clone o repositório:
    ```bash
    git@github.com:WilliansonDantas/Task_Management.git
    ```

2. Navegue para o diretório do projeto:
    ```bash
    cd task-management-api
    ```

3. Instale as dependências:
    ```bash
    npm install
    ```

4. Configure as variáveis de ambiente:
    - Crie um arquivo `.env` na raiz com as seguintes variáveis:
        ```
        DATABASE_TYPE=mysql
        DATABASE_HOST=localhost
        DATABASE_PORT=3306
        DATABASE_USERNAME=seu_usuario
        DATABASE_PASSWORD=sua_senha
        DATABASE_NAME=task_management
        ```

5. Suba os contêineres com Docker Compose:
    ```bash
    docker-compose up --build -d
    ```

6. Execute as migrações do banco de dados:
    ```bash
    npm run typeorm:migrate
    ```

7. Inicie a aplicação:
    ```bash
    npm run start:dev
    ```

## <img height="20" src="https://raw.githubusercontent.com/innng/innng/master/assets/soulgem-sayaka.gif"/> Teste Manual da Aplicação

Siga os passos abaixo para testar manualmente as funcionalidades da aplicação:

### 1. Criar um Tenant

- Endpoint: `POST /tenants`
- Exemplo de payload:
  ```json
  {
    "name": "Empresa ABC"
  }

### 2. Criar um Usuário

- Endpoint: POST /users
- Exemplo de payload:
    ```json

    {
      "username": "joaosilva",
      "email": "joao@empresaabc.com",
      "password": "senhaSegura123",
      "role": "admin",
      "tenantId": "id-do-tenant-gerado-no-passo-1"
    }

### 3. Fazer o Login
- Endpoint: POST /auth/login
- Exemplo de payload:
    ```json
    
    {
      "email": "joao@empresaabc.com",
      "password": "senhaSegura123"
    }

### 4. Usar o JWT para Acessar Outras Funcionalidades
Após obter o token JWT no passo 3, insira-o no cabeçalho das próximas requisições.

Você agora pode acessar as demais funcionalidades da API, como gestão de tarefas, listagem de usuários, entre outros.

### <img height="20" src="https://raw.githubusercontent.com/innng/innng/master/assets/soulgem-sayaka.gif"/> Acesse a documentação da API via Swagger em [http://localhost:3000/api](http://localhost:3000/api)
