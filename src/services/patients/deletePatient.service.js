import { database } from "../../data-source"
import { AppError } from "../../errors/AppError"

const deletePatientService = async (rg) => {
    if (!rg) {
        throw new AppError(400, {
            error: "error",
            message: "You need to inform patient RG"
        })
    }

    try {        
        const res = await database.query(
            `DELETE FROM
                patient
            WHERE
                rg = $1;`,
            [rg]
        )

        if(res.rowCount === 0) throw new AppError(404, "Patient not found")

    } catch (error) {
        const { message } = error

        if (message.includes("violates foreign key constraint")) {
                throw new AppError(409, {
                    error: "error",
                    message: "Patient cannot be deleted, first delete the appointments"
            }
        )}

        throw new AppError(error.statusCode, {
            error: "error",
            message: error.message
        })
    }
}

export default deletePatientService
