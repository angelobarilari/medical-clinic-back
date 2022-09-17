import { database } from "../../data-source"
import { AppError } from "../../errors/AppError";
import { hash } from "bcrypt";

const createDoctorService = async (name, crm, phone, email, specialization, password) => {
    const verifyValues = [name, crm, phone, email, specialization, password]

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
                doctor(name, crm, phone, email, specialization, password)
            VALUES
                ($1, $2, $3, $4, $5, $6)
            RETURNING *;`,
            [name, crm, phone, email, specialization, hashedPassword]
        )
        
        return res.rows[0]
    } catch(error) {
        const { message } = error

        if (message.includes("duplicate key value")) {
            if (message.includes("doctor_crm_key")) throw new AppError(409, {
                    error: "error",
                    message: "CRM already registered"
                })

            if (message.includes("doctor_email_key")) throw new AppError(409, { 
                    error: "error",
                    message: "Email already registered"
                })
        }
    }
}

export default createDoctorService
