import { Client } from "pg";
import "dotenv/config"

export const database = new Client(
  process.env.NODE_ENV === "test"
    ? {
        user: "postgres",
        host: "localhost",
        database: process.env.POSTGRES_DB_TEST,
        password: "1234",
        port: 5432,
      }
    : {
        type: "postgres",
        url: process.env.DATABASE_URL,
        ssl:
          process.env.NODE_ENV === "production"
            ? { rejectUnauthorized: false }
            : false,
        synchronize: false,
        logging: true,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        database: process.env.DB,
        port: process.env.DB_PORT,
      }
);

export const startDatabase = async () => {
  await database.connect();
};
