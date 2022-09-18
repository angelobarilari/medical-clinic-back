import { database } from "../../data-source.mjs"
import { AppError } from "../../errors/AppError.js"
import { lowerCaseLetters, 
    upperCaseLetters, 
    numbers, 
    symbols, 
    passwordFunction } from "../../helpers/generatePassword"
import { hash } from "bcrypt"

const createResponsibleService = async (name, rg, phone, email) => {
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
                responsible(name, rg, phone, email, password)
            VALUES
                ($1, $2, $3, $4, $5)
            RETURNING *;`
            [name, rg, phone, email, hashedPassword]
        )

        return res.rows[0]
    } catch (error) {
        const { message } = error

        if (message.includes("duplicate key value")) {
            if (message.includes("responsible_rg_key")) throw new AppError(409, {
                    error: "error",
                    message: "RG already registered"
                })


            if (message.includes("responsible_email_key")) throw new AppError(409, { 
                    error: "error",
                    message: "Email already registered"
                })
        }
    }
}

export default createResponsibleService

