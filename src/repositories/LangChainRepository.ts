import { ChatOpenAI } from "@langchain/openai";
import { createSqlQueryChain } from "langchain/chains/sql_db";
import { prompt } from "../models/sqlQueryPromptTemplate";
import { IDatabaseQueryRepository } from "./IDatabaseQueryRepository";
import { ILLMRepository } from "./ILLMRepository";

export class LangChainRepository implements ILLMRepository {
  private llm: ChatOpenAI;

  constructor(
    private databaseQueryRepository: IDatabaseQueryRepository,
    openai_apiKey: string
  ) {
    this.llm = new ChatOpenAI({
      apiKey: openai_apiKey,
      model: "gpt-3.5-turbo",
    });
  }
  async getSqlQueryResult(query: string) {
    const queryResult = await await this.databaseQueryRepository.runQuery(
      query
    );
    return JSON.parse(queryResult);
  }

  async generateSqlResultMessage({
    queryResult,
    userQuestion,
  }: {
    userQuestion: string;
    queryResult: JSON;
  }) {
    const openaiResponse = await this.llm.invoke(
      `Pergunta do usuário: ${userQuestion}\nResultado da SQL query:\n${JSON.stringify(
        queryResult,
        null,
        2
      )}\nResponda a pergunta de uma forma amigável e com informações completas de acordo com o resultado do sql query. Se não souber e não tiver dados sobre a pergunta não invente nenhuma resposta.`
    );
    return openaiResponse.content.toString();
  }
  async createSqlQuery(question: string) {
    const chain = await createSqlQueryChain({
      db: await this.databaseQueryRepository.getDatabase(),
      llm: this.llm,
      prompt,
      dialect: "mysql",
    });
    const sqlQuery = await chain.invoke({
      question,
      top_k: 2,
      table_info: "northwind",
    });

    return sqlQuery;
  }
}
