import { SqlDatabase } from "langchain/sql_db";
import { IDatabaseConfig } from "../config.ts/databaseConfig";
import { IDatabaseQueryRepository } from "./IDatabaseQueryRepository";

export class DatabaseQueryRepository implements IDatabaseQueryRepository {
  private database: SqlDatabase | null = null;

  constructor(private dbConfig: IDatabaseConfig) {}

  async runQuery(query: string) {
    const db = await this.getDatabase();
    return db.run(query);
  }

  async getDatabase(): Promise<SqlDatabase> {
    if (!this.database) {
      this.database = await this.dbConfig.initialize();
    }
    return this.database;
  }
}
