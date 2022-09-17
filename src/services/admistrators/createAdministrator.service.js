import { database } from "../../data-source";
import { AppError } from "../../errors/AppError";
import { hash } from "bcrypt";

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

    const hashedPassword = await hash(randomPassword, 10)

    try {
        const res = await database.query(
            `INSERT INTO
                administrator
            VALUES
                ($1, $2, $3, $4)`, 
            [email, phone, name, hashedPassword]
        )

        return res.rows[0]
    } catch (error) {
        const { message } = error

        if (message.includes("duplicate key value")) throw new AppError(409, { 
                error: "error",
                message: "Email already registered"
            })
        
    }
}

export default createAdministratorService

