import { database } from "../../data-source";
import { AppError } from "../../errors/AppError";

const updateAdministratorService = async (id, administratorData) => {
    try {
        let query = "UPDATE administrator SET "
        const keys = Object.keys(administratorData)
        const values = Object.values(administratorData)

        keys.forEach((key, index) => {
            query += `${key} = \$${index += 1}, `
        });

        query = query.slice(0, -2)

        query += ` WHERE id = \$${keys.length += 1} RETURNING *;`
        console.log(query)
        const res = await database.query(
            query,
            [...values, id]
        )

        if (res.rowCount === 0) throw new AppError(404, "Administrator not found")

        return res.rows[0]
    } catch (error) {
        const { message } = error
        console.log(error.message)

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

export default updateAdministratorService
