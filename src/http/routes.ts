import { FastifyInstance } from "fastify";
import { QuestionToSqlResponseController } from "./controller/QuestionToSqlResponseController";

export async function appRoutes(app: FastifyInstance) {
  app.post("/questiontosqlresponse", QuestionToSqlResponseController);
}
