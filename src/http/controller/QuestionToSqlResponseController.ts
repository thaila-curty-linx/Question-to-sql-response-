import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { DatabaseConfig } from "../../config.ts/databaseConfig";
import { env } from "../../env";
import { DatabaseQueryRepository } from "../../repositories/DatabaseQueryRepository";
import { LangChainRepository } from "../../repositories/LangChainRepository";
import { QuestionToSqlResponseService } from "../../services/QuestionToSqlResponseService";

export async function QuestionToSqlResponseController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const databaseConfig = new DatabaseConfig();

    const authenticateBodySchema = z.object({
      question: z.string(),
    });
    const { question } = authenticateBodySchema.parse(request.body);

    const databaseQueryRepository = new DatabaseQueryRepository(databaseConfig);

    const illmRepository = new LangChainRepository(
      databaseQueryRepository,
      env.OPENAI_API_KEY
    );
    const questionToSqlResponseService = new QuestionToSqlResponseService(
      illmRepository
    );
    const response = await questionToSqlResponseService.execute(question);

    reply.status(200).send(response);
  } catch (error) {
    console.error("Error executing GPT service:", error);
    reply
      .status(500)
      .send({ error: "An error occurred while processing your request." });
  }
}
