import { ILLMRepository } from "../repositories/ILLMRepository";

interface QuestionToSqlResponseServiceResponse {
  userQuestion: string;
  sqlQuery: string;
  sqlResult: any[];
  botAnswerMessage: string;
}

export class QuestionToSqlResponseService {
  constructor(private llmRepository: ILLMRepository) {}
  async execute(
    question: string
  ): Promise<QuestionToSqlResponseServiceResponse> {
    const sqlQuery = await this.llmRepository.createSqlQuery(question);

    const sqlResult = await this.llmRepository.getSqlQueryResult(sqlQuery);

    const botAnswerMessage = await this.llmRepository.generateSqlResultMessage({
      queryResult: sqlResult,
      userQuestion: question,
    });

    return { botAnswerMessage, sqlQuery, userQuestion: question, sqlResult };
  }
}
