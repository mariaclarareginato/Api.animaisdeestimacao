# API Animais

<img width="1000" height="550" alt="image" src="https://github.com/user-attachments/assets/89008549-e948-4413-b93c-53803c9a559a" />


#

A **API Animais** é um projeto desenvolvido para gerenciar informações sobre diferentes tipos de animais de estimação. Ela oferece endpoints para **leitura, criação, atualização e exclusão (CRUD)** de dados dos animais, como tipo, raça, nome, e cuidados e características.

Este projeto é ideal
para fins educacionais, demonstrações ou como base para sistemas de adoção, clínicas veterinárias ou zoológicos.

---

## Tecnologias Utilizadas:

- **Node.js**
- **Express**
- **Banco de dados (MySQL)**


---

## Como rodar o projeto localmente:

1. **Clone o repositório:**

```bash
git clone https://github.com/mariaclarareginato/api.animais.git
```

2. **Acesse a pasta do projeto:**

```bash
cd api.animais
```


3. **Instale as dependências:**

```bash
npm install
```



4. **Inicie o servidor:**

```bash

npm run dev
```

O servidor iniciará em http://localhost:3000.




## Rotas da API:


### . Criar um animal

POST /animais

Corpo da requisição (JSON):

```json
{
  "tipo": "Pássaro",
  "raca": "Papagaio",
  "nome": "  João",
  "cuidadosecaracteristicas": "Muito falante e engraçado."  
}

```

### . Listar todos os animais

GET /animais


### . Buscar animal por ID


GET /animais/:id


### . Atualizar animal

PUT /animais/:id

Corpo da requisição (JSON): mesmo formato do POST (Criar animal).

### . Deletar animal

DELETE /animais/:id

