import express, { response } from "express";
import { AppError } from "./errors/AppError.js";
import { startDatabase } from "./data-source.js";
import appRoutes from "./routes/index.js";

const app = express();
const port = 3000

app.use(express.json());
appRoutes(app)

app.use((error, req, res) => {
    if (error instanceof AppError) {
        console.log(error)
        return res.status(301).json({
            status: "error",
            message: "erro com a instance"
        })
    }

    return response.status(300).json({
        status: "error",
        message: "Erro no servidor"
    })
})

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running in port ${port}`)
    startDatabase();
});

export default app
