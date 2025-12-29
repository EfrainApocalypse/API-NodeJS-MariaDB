# My first Node.js API

Uma API REST robusta construída com Node.js, TypeScript e Fastify, utilizando MariaDB como banco de dados. O projeto implementa um CRUD completo de mensagens com validação rigorosa de tipos e documentação automática via Swagger.

## Tecnologias

Este projeto utiliza as seguintes tecnologias:

* **Runtime:** Node.js (v20+)
* **Framework:** Fastify
* **Linguagem:** TypeScript
* **Banco de Dados:** MariaDB (via mysql2)
* **Validação:** Zod & fastify-type-provider-zod
* **Documentação:** Swagger & Scalar
* **Linter/Formatter:** Biome
* **Gerenciador de Pacotes:** pnpm

---

## Pré-requisitos

Antes de começar, você precisará ter instalado:

1. Node.js
2. pnpm
3. Uma instância do MariaDB ativa.

### Estrutura do Banco de Dados

Certifique-se de criar a tabela necessária antes de rodar a aplicação:

```sql
CREATE TABLE `mensagens` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `autor` VARCHAR(255) NOT NULL,
  `valor` TEXT NOT NULL,
  `hora` DATETIME DEFAULT CURRENT_TIMESTAMP
);

```

---

## Instalação e Configuração

1. **Clone o repositório:**
```bash
git clone <url-do-seu-repositorio>
cd <nome-da-pasta>

```


2. **Instale as dependências:**
```bash
pnpm install

```


3. **Configure as variáveis de ambiente:**
Copie o arquivo `.env.example` para um novo arquivo chamado `.env` e preencha com suas credenciais:
```bash
cp .env.example .env

```



---

## Executando o Projeto

### Modo de Desenvolvimento

O projeto utiliza tsx para rodar o TypeScript diretamente com monitoramento de arquivos:

```bash
pnpm dev

```

### Lint e Formatação

Para verificar e corrigir o estilo do código utilizando o Biome:

```bash
pnpm format

```

---

## Rotas da API

A API gerencia mensagens através dos seguintes endpoints:

| Método | Rota | Descrição |
| --- | --- | --- |
| **GET** | `/messages` | Lista todas as mensagens (ordenadas por data) |
| **POST** | `/messages` | Cria uma nova mensagem |
| **PUT** | `/messages` | Atualiza uma mensagem existente |
| **DELETE** | `/messages` | Remove uma mensagem |

### Documentação Interativa

Com o servidor rodando, a documentação detalhada da API (Swagger UI) pode ser acessada em:
`http://localhost:3333/docs`

---

## Estrutura de Arquivos

* `src/server.ts`: Configuração do servidor, plugins e inicialização.
* `src/routes.ts`: Definição das rotas e esquemas de validação.
* `src/db.ts`: Configuração da conexão com o banco de dados.
* `src/types.ts`: Tipagens globais para integração do Fastify com Zod.
