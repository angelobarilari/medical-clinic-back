import { database } from "../../data-source";
import { AppError } from "../../errors/AppError";
import { hash } from "bcrypt";
import { v4 as uuidv4 } from "uuid";

const createAdministratorService = async (email, phone, name, password) => {
    console.log("entrou no service")
    const verifyValues = [email, phone, name, password]

    verifyValues.forEach(value => {
        if (!value) {
            throw new AppError(400, {
                error: "error",
                message: "Missing data"
            })
        }
    });

    const hashedPassword = await hash(password, 10)
    const userID = uuidv4()

    try {

        const res = await database.query(
            `INSERT INTO
                administrator
            VALUES  
                ($1, $2, $3, $4, $5, $6)
            RETURNING *;`,
            [userID, email, phone, name, true, hashedPassword]
        )

        return res.rows[0]
    } catch (error) {
        const { message } = error

        if (message.includes("duplicate key value")) throw new AppError(409, { 
                error: "error",
                message: "Email already registered"
            })
        
        throw new AppError(error.statusCode, {
            error: "error",
            message: error.message
        })
    }
}

export default createAdministratorService

