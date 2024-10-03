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
