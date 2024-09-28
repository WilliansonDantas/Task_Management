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

- Node.js (versão LTS)
- MySQL
- Git

### Passos

1. Clone o repositório:
    ```bash
    git clone https://github.com/seu-usuario/task-management-api.git
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
        DATABASE_HOST=localhost
        DATABASE_PORT=3306
        DATABASE_USERNAME=seu_usuario
        DATABASE_PASSWORD=sua_senha
        DATABASE_NAME=task_management
        JWT_SECRET=SUA_CHAVE_SECRETA
        ```

5. Execute as migrações (se aplicável):
    ```bash
    npm run typeorm migration:run
    ```

6. Inicie a aplicação:
    ```bash
    npm run start:dev
    ```

### <img height="20" src="https://raw.githubusercontent.com/innng/innng/master/assets/soulgem-sayaka.gif"/> Acesse a documentação da API via Swagger em [http://localhost:3000/api](http://localhost:3000/api)
