import { database } from "../../data-source";
import { AppError } from "../../errors/AppError";

const createAdministratorService = async (email, phone, name, password) => {
    const verifyValues = [email, phone, name, password]

    verifyValues.forEach(value => {
        if (!value) {
            throw new AppError(400, {
                error: "error",
                message: "Missing data"
            })
        }
    });

    try {
        const res = await database.query(
            `INSERT INTO
                administrator(email, phone, name, password)
            VALUES
                ($1, $2, $3, $4)
            RETURNING *;`, 
            [email, phone, name, password]
        )
        return res.rows[0]
    } catch (error) {
        const { message } = error

        if (message.includes("duplicate key value")) throw new AppError(409, { 
                error: "error",
                message: "Email already registered"
            })
        
        throw new AppError(error.statusCode).json({
            error: "error",
            message: error.message
        })
    }
}

export default createAdministratorService

