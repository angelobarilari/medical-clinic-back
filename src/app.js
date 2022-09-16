import express, { response } from "express";
import { AppError } from "./errors/AppError";
import { startDatabase } from "./data-source";
import appRoutes from "./routes";

const app = express();
const port = 3000

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

app.listen(port, () => {
    console.log(`Server is running in port ${port}`)
    startDatabase();
});


export default app
