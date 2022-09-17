import express, { response } from "express";
import { AppError } from "./errors/AppError";
import appRoutes from "./routes";
import { Client } from "pg";
import "dotenv/config"

const database = new Client(
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
        ssl: process.env.NODE_ENV === "production"
            ? { rejectUnauthorized: false }
            : false
      }
);

const app = express();
const port = 3000

app.use(express.json());
appRoutes(app)

app.use((error, req, res) => {
    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            status: "error",
            message: error.message
        })
    }

    return response.status(500).json({
        status: "error",
        message: "Internal server error"
    })
})

app.listen(process.env.PORT || 3000, async () => {
    console.log(`Server is running in port ${port}`)
    await database.connect()
    console.log("running")
});

export default app
