import { database } from "../../data-source"
import { AppError } from "../../errors/AppError"

const updateDoctorService = async (crm, doctorData) => {
    try {

        let query = "UPDATE doctor SET "
        const keys = Object.keys(doctorData)
        const values = Object.values(doctorData)

        keys.forEach((key, index) => {
            query += `${key} = \$${index += 1}, `
        });

        query = query.slice(0, -2)

        query += ` WHERE crm = \$${keys.length += 1} RETURNING *;`

        const res = await database.query(
            query,
            [...values, crm]
        )

        if (res.rowCount === 0) {
            console.log("erro de nao encontrado")
            throw new AppError(404, "Doctor not found")
        }

        return res.rows[0]
    } catch (error) {
        const { message } = error

        if (message.includes("duplicate key value")) {
            if (message.includes("doctor_crm_key")) {
                console.log("erro de crm")
                throw new AppError(409, {
                    error: "error",
                    message: "CRM already registered"
                })
            }
            console.log("crm dupli")
            if (message.includes("doctor_email_key")) {
                console.log("erro de email")
                throw new AppError(409, { 
                    error: "error",
                    message: "Email already registered"
                })
            }
        }
    }
}

export default updateDoctorService

