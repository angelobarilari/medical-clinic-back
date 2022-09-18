import { database } from "../../data-source.mjs"
import { AppError } from "../../errors/AppError.js"

const deleteDoctorService = async (crm) => {
    if (!crm) throw new AppError(400, {
            error: "error",
            message: "Missing CRM"
    })

    try {
        const res = await database.query(
            `DELETE FROM
                doctor
            WHERE
                crm = $1;`,
            [crm]
        )
        
        if (res.rowCount === 0) throw new AppError(404, {
            error: "error",
            message: "Doctor not found"
        })

    } catch (error) {
        const { message } = error

        if (message.includes("violates foreign key constraint")) throw new AppError(409, {
            error: "error",
            message: "Doctor cannot be deleted, first delete the appointments"
        })

        throw new AppError(error.statusCode, {
            error: "error",
            message: error.message
        })
    }
}

export default deleteDoctorService

