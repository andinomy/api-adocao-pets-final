# API Adoção de Pets

Projeto da disciplina de Desenvolvimento de Serviços Web.

## Descrição

API REST para cadastro de usuarios, cadastro de pets e adocao de animais usando login com JWT.

O sistema tem dois tipos de usuario:

- `admin`: pode gerenciar usuarios, pets e listar adoções.
- `adopter`: pode ver o proprio perfil, editar o proprio perfil e adotar pets.

## Tecnologias

- Node.js
- Express
- MySQL
- JWT
- bcrypt
- ESLint
- Prettier

## Como instalar

```bash
npm install
```

Crie um arquivo `.env` baseado no `.env.example`:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=pets_db
JWT_SECRET=segredo_pets
```

Crie um banco no MySQL:

```bash
mysql -u root -p < src/database/schema.sql
```

## Como executar

```bash
npm run dev
```

Para rodar ESLint:

```bash
npm run lint
```

## Estrutura

```text
src/
├── config
├── controllers
├── database
├── middlewares
├── models
├── routes
└── services
tests/
└── requests.http
```

## Banco de dados

O script fica em `src/database/schema.sql`.

Tabelas criadas:

- `users`: id, name, email, password, phone, role.
- `pets`: id, name, age, species, size, status, description.
- `adoptions`: id, user_id, pet_id, adoption_date.

## Rotas públicas

- `GET /`: testa se a API esta funcionando.
- `GET /pets/available`: lista pets disponiveis.
- `POST /users`: cria usuario.
- `POST /login`: faz login e retorna token JWT.

## Rotas protegidas

Usuários:

- `GET /users`: lista usuarios, somente admin.
- `GET /users/:id`: admin ou o proprio usuario.
- `PUT /users/:id`: admin ou o proprio usuario.
- `DELETE /users/:id`: somente admin.

Pets:

- `GET /pets`: lista todos os pets, somente admin.
- `GET /pets/:id`: busca pet por id, somente admin.
- `POST /pets`: cria pet, somente admin.
- `PUT /pets/:id`: atualiza pet, somente admin.
- `DELETE /pets/:id`: remove pet disponivel, somente admin.

Adoções:

- `GET /adoptions`: lista adocoes, somente admin.
- `POST /adoptions`: adota um pet, somente adopter.

## Regras feitas

- Senha salva com bcrypt.
- Senha nao aparece nas respostas JSON.
- Token JWT contem `userId` e `role`.
- Token expira em 1 hora.
- Pet novo entra com status `available`.
- Pet adotado muda para `adopted`.
- Pet adotado nao pode ser removido.
- Apenas adopter pode adotar pet.
- Apenas admin pode cadastrar, editar e remover pets.

## Testes manuais

Use o arquivo `tests/requests.http` no REST Client ou copie as requisicoes para Postman/Insomnia.

## Autor

Mylena Andino
