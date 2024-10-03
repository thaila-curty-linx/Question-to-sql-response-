import { SqlDatabase } from "langchain/sql_db";
import { DataSource } from "typeorm";
import { env } from "../env";

export interface IDatabaseConfig {
  initialize(): Promise<SqlDatabase>;
}

export class DatabaseConfig implements IDatabaseConfig {
  private datasource: DataSource;

  constructor() {
    this.datasource = new DataSource({
      type: "mysql",
      host: env.DATABASE_HOST,
      port: env.DATABASE_PORT,
      username: env.DATABASE_USERNAME,
      password: env.DATABASE_PASSWORD,
      database: env.DATABASE_NAME,
    });
  }

  async initialize() {
    try {
      await this.datasource.initialize();
      const db = await SqlDatabase.fromDataSourceParams({
        appDataSource: this.datasource,
      });

      return db;
    } catch (error) {
      throw new Error("Database initialization failed");
    }
  }
}
