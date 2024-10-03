import { beforeEach, describe, expect, test } from "vitest";
import { examples } from "../examples/examples";
import { ILLMRepository } from "../repositories/ILLMRepository";
import { QuestionToSqlResponseService } from "./QuestionToSqlResponseService";

const mockLLMRepository: ILLMRepository = {
  generateSqlResultMessage: async ({ queryResult, userQuestion }) =>
    `Os dois pedidos mais recentes são: \n1. Pedido número 1234, realizado em 2022-01-15, com 3 unidades do produto A e 2 unidades do produto B.\n2. Pedido número 1235, realizado em 2022-01-16, com 1 unidade do produto C e 4 unidades do produto D.`,
  createSqlQuery: async (question: string) => examples[0].query,
  getSqlQueryResult: async (query: string) => [
    {
      id: 30,
      employee_id: 9,
      customer_id: 27,
      order_date: "2006-01-15T02:00:00.000Z",
      shipped_date: "2006-01-22T02:00:00.000Z",
      shipper_id: 2,
      ship_name: "Karen Toh",
      ship_address: "789 27th Street",
      ship_city: "Las Vegas",
      ship_state_province: "NV",
      ship_zip_postal_code: "99999",
      ship_country_region: "USA",
      shipping_fee: "200.0000",
      taxes: "0.0000",
      payment_type: "Check",
      paid_date: "2006-01-15T02:00:00.000Z",
      notes: null,
      tax_rate: 0,
      tax_status_id: null,
      status_id: 3,
    },
  ],
};

const mockDatabaseQueryRepository = {
  runQuery: async (query: string) => [
    {
      id: 30,
      employee_id: 9,
      customer_id: 27,
      order_date: "2006-01-15T02:00:00.000Z",
      shipped_date: "2006-01-22T02:00:00.000Z",
      shipper_id: 2,
      ship_name: "Karen Toh",
      ship_address: "789 27th Street",
      ship_city: "Las Vegas",
      ship_state_province: "NV",
      ship_zip_postal_code: "99999",
      ship_country_region: "USA",
      shipping_fee: "200.0000",
      taxes: "0.0000",
      payment_type: "Check",
      paid_date: "2006-01-15T02:00:00.000Z",
      notes: null,
      tax_rate: 0,
      tax_status_id: null,
      status_id: 3,
    },
  ],
  getDatabase: async () => {},
};

describe("Question To Sql Response Service Test", () => {
  let sut: QuestionToSqlResponseService;
  beforeEach(() => {
    sut = new QuestionToSqlResponseService(mockLLMRepository);
  });
  test("shuld send a question and return the object result", async () => {
    const question = examples[0].input;

    const response = await sut.execute(question);

    expect(response).toHaveProperty("userQuestion", question);
    expect(response).toHaveProperty("sqlQuery", examples[0].query);
  });
});
