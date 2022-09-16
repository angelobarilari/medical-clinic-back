import { database } from "../../data-source"
import { AppError } from "../../errors/AppError"
//import { passwordFunction, lowerCaseLetters, upperCaseLetters, numbers, symbols } from "../../helpers/generatePassword"

const createPatientService = async (name, rg, phone, email, password, responsible_id) => {
    console.log()
    if (!name) throw new AppError(400, {
        error: "error",
        message: "You must enter with a name"
    })

    //console.log(passwordFunction(lowerCaseLetters, upperCaseLetters, numbers, rg))
    
    try {
        const res = await database.query(
            `INSERT INTO
                patient(name, rg, phone, email, password, responsible_id)
            VALUES
                ($1, $2, $3, $4, $5, $6)
            RETURNING *;`,
            [name, rg, phone, email, password, responsible_id]
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
    }
}

export default createPatientService

