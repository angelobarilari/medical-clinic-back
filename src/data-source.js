import { Client } from "pg";
import "dotenv/config"

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
  console.log("ta no database")
  await database.connect();
  console.log("n conectou")
};
