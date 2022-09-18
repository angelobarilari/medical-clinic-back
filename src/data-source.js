import { Client } from "pg";
import "dotenv/config"

//const isProduction = process.env.NODE_ENV === "production"

export const database = new Client(
  process.env.NODE_ENV === "test"
    ? {
        user: "postgres",
        host: "localhost",
        database: "tests_products",
        password: "1234",
        port: 5432,
      }
    : {
        connectionString: process.env.NODE_ENV,
        ssl:
          process.env.NODE_ENV === "production"
            ? { rejectUnauthorized: false }
            : false
      }
);

export const startDatabase = async () => {
  await database.connect();
};
