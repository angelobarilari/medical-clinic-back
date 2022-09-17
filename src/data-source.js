
/*import { Client } from "pg";
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
            : false
      }
);

export const startDatabase = async () => {
  console.log("database")
  await database.connect();
};
*/