import { database } from "../../data-source.mjs"
import { AppError } from "../../errors/AppError.js"
import { lowerCaseLetters, 
         upperCaseLetters, 
         numbers, 
         symbols, 
         passwordFunction } from "../../helpers/generatePassword"
import { hash } from "bcrypt"

const createPatientService = async (name, rg, phone, email, responsible_id) => {
    if (!name) throw new AppError(400, {
        error: "error",
        message: "You must enter with a name"
    })

    const randomPassword = passwordFunction(lowerCaseLetters, 
        upperCaseLetters, 
        numbers, 
        symbols, 
        passwordFunction, 
        rg
    )

    const hashedPassword = await hash(randomPassword, 10)

    try {
        const res = await database.query(
            `INSERT INTO
                patient(name, rg, phone, email, password, responsible_id)
            VALUES
                ($1, $2, $3, $4, $5, $6)
            RETURNING *;`,
            [name, rg, phone, email, hashedPassword, responsible_id]
        )

        return res.rows[0]
    } catch (error) {
        const { message } = error

        if (message.includes("duplicate key value")) {
            if (message.includes("patient_rg_key")) throw new AppError(409, {
                    error: "error",
                    message: "RG already registered"
                })


            if (message.includes("patient_email_key")) throw new AppError(409, { 
                    error: "error",
                    message: "Email already registered"
                })
        }

        throw new AppError(400, {
            error: "error",
            message: error.message
        })
    }
}

export default createPatientService

