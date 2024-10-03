# Question-to-sql-response
### 1. **Introdução**

- **Descrição**: Essa aplicação utiliza tecnologia text2sql para extrair insights valiosos dos dados disponíveis para uma analise rápida e precisa.
- **Objetivo**: O código tem como objetivo usar llm para converter perguntas em uma query de banco de dados e executa-las, retornando o resultado a partir de uma resposta de uma inteligência artificial..
- **Tecnologias Utilizadas**: Node.js, typescript , vitest, langchain, open ai Api, typeorm,fastify,zod.

### 2. **Instalação e Configuração**

1. Instale as dependecias do projeto
(Instale pnpm)

```jsx
pnpm i
```

1. Crie um arquivo .env e preenche-o (Use o .env.exemplo como exemplo para ser seguido)
2. Rode o codigo

```jsx
pnpm dev
```

1. Faça uma requisição POST para a rota /questiontosqlresponse, passando a pergunta no corpo  como "question".

### 3. **API Reference**

- **Descrição das Funções/Métodos**: Para cada função ou método, inclua:
    - Nome: Question to sql response
    - Descrição: A partir de uma pergunta gera uma consulta SQL, realiza a consulta no banco e retorna resposta do bot, consulta Sql , resultado da consulta e a pergunta do usuario.
    - Rota: /questiontosqlresponse
    - Método: Post
    - Parâmetros(body) : question(tipo string)
    
    ```jsx
    {
    	question:string
    }
    ```
    
    - Retorno: (tipo e significado)
    
    ```jsx
    {
    	userQuestion: string;
      sqlQuery: string;
      sqlResult: JSON;
      botAnswerMessage: string;
      }
    ```
    

### 4. **Estrutura de Código**

**4.1. Repositórios:** 

- DatabaseQueryRepository:
    - runQuery:  executa uma consulta SQL e retorna o resultado da consulta.
    - getDatabase: inicializa e configurar o banco de dados e retorna o banco de dados inicializado.

```jsx
export interface IDatabaseQueryRepository {
  runQuery(query: string): Promise<any>;
  getDatabase(): Promise<SqlDatabase>;
}
```

- LangChainRepository:
    - createSqlQuery: gera uma consulta SQL de acordo com a pergunta do usuário.
    - getSqlQueryResult: executa uma consulta no banco de dados.
    - generateSqlResultMessage: Gera uma resposta a partir da pergunta do usuário e do resultado da consulta SQL usando Api do OpenAI

```jsx
export interface ILLMRepository {
  generateSqlResultMessage({
    queryResult,
    userQuestion,
  }: {
    userQuestion: string;
    queryResult: any;
  }): Promise<string>;
  createSqlQuery(question: string): Promise<string>;
  getSqlQueryResult(query: string): Promise<any[]>;
}

```

**4.2. Service (caso de uso):**

- QuestionToSqlResponseService:
    - execute: A partir da pergunta do usuário, é gerada uma resposta baseada no resultado da consulta SQL e na pergunta do usuário.

```jsx
QuestionToSqlResponseService({userQuestion,sqlQuery,sqlResult,botAnswerMessage}:QuestionToSqlResponseServiceResponse):Promise<QuestionToSqlResponseServiceResponse>

interface QuestionToSqlResponseServiceResponse {
  userQuestion: string;
  sqlQuery: string;
  sqlResult: any[];
  botAnswerMessage: string;
}

```

### 5. **Testes**

- **Instruções de Teste**:
    - Rode:

```jsx
pnpm test
```
