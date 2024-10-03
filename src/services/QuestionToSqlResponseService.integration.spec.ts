import { beforeEach, describe, expect, test } from "vitest";
import { DatabaseConfig } from "../config.ts/databaseConfig";
import { env } from "../env";
import { examples } from "../examples/examples";
import { DatabaseQueryRepository } from "../repositories/DatabaseQueryRepository";
import { IDatabaseQueryRepository } from "../repositories/IDatabaseQueryRepository";
import { ILLMRepository } from "../repositories/ILLMRepository";
import { LangChainRepository } from "../repositories/LangChainRepository";
import { QuestionToSqlResponseService } from "./QuestionToSqlResponseService";

describe("Question To Sql Response Service Test", () => {
  let sut: QuestionToSqlResponseService;
  let llmRepository: ILLMRepository;
  let databaseQueryRepository: IDatabaseQueryRepository;
  beforeEach(() => {
    const databaseConfig = new DatabaseConfig();

    databaseQueryRepository = new DatabaseQueryRepository(databaseConfig);
    llmRepository = new LangChainRepository(
      databaseQueryRepository,
      env.OPENAI_API_KEY
    );
    sut = new QuestionToSqlResponseService(llmRepository);
  });
  test("should execute QuestionToSqlResponseService and return a valid answear", async () => {
    const question =
      "Quais são os produtos mais populares entre os clientes corporativos?";

    const response = await sut.execute(question);

    expect(response).toHaveProperty("userQuestion", question);
    expect(response.botAnswerMessage).toContain(
      response?.sqlResult[0].product_name
    );
    expect(response.sqlQuery).toBeDefined();
  }, 900000);
  test("should execute QuestionToSqlResponseService and generate a correct SQL query ", async () => {
    const question = examples[0].input;

    const response = await sut.execute(question);

    expect(response.sqlQuery).toBe(examples[0].query);
  }, 900000);

  test(" should execute QuestionToSqlResponseService and return a SQL result ", async () => {
    const question = examples[0].input;

    const response = await sut.execute(question);

    expect(response.sqlResult).toBeDefined();
    expect(Object.keys(response.sqlResult).length).toBeGreaterThanOrEqual(1);
  }, 900000);

  test("should execute QuestionToSqlResponseService  with a question for which data is not in the database and return an empty SQL result ", async () => {
    const question = "quantas flores foram vendidas por mes?";

    const response = await sut.execute(question);

    expect(Object.keys(response.sqlResult).length).toBe(0);
  }, 900000);
  test("should throw an error when executing QuestionToSqlResponseService with an invalid query ", async () => {
    const question = "quantas estudantes tem na tabela students?";

    await expect(sut.execute(question)).rejects.toBeInstanceOf(Error);
  }, 900000);
});
