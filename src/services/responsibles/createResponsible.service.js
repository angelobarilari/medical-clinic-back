import { database } from "../../data-source"
import { AppError } from "../../errors/AppError"

const createResponsibleService = async (name, rg, phone, email, password) => {
    if (!name) throw new AppError(400, {
        error: "error",
        message: "You must enter with a name"
    })

    try {
        console.log("entrou no try")
        console.log(name, rg, phone, email, password)
        const res = await database.query(
            `INSERT INTO
                responsible(name, rg, phone, email, password)
            VALUES
                ($1, $2, $3, $4, $5)
            RETURNING *;`,
            [name, rg, phone, email, password]
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
        
        throw new AppError(350), {
            error: "error",
            message: error.message
        }
    }
}

export default createResponsibleService

