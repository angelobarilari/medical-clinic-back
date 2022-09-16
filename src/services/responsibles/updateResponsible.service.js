import { database } from "../../data-source"
import { AppError } from "../../errors/AppError"

const updateResponsibleService = async (responsibleIdentification, newResponsibleData) => {
    try {
        let query = "UPDATE responsible SET "
        const keys = Object.keys(newResponsibleData)
        const values = Object.values(newResponsibleData)

        keys.forEach((key, index) => {
            query += `${key} = \$${index += 1}, `
        });
        
        query = query.slice(0, -2)

        query += ` WHERE name = \$${keys.length += 1} RETURNING *;`

        const res = await database.query(
            query,
            [...values, responsibleIdentification]
        )

        if (res.rowCount === 0) throw new AppError(404, "Responsible not found")

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

        throw new AppError(error.statusCode, {
            error: "error",
            message: error.message
        })
    }
}

export default updateResponsibleService

