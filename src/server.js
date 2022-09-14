import app from "./app";
import { startDatabase } from "./data-source";
import "dotenv/config"

app.listen(process.env.DB_PORT, () => {
    console.log("Servidor rodando")
    startDatabase();
});
  