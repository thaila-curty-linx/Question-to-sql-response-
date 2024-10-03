import { SqlDatabase } from "langchain/sql_db";

export interface IDatabaseQueryRepository {
  runQuery(query: string): Promise<any>;
  getDatabase(): Promise<SqlDatabase>;
}
