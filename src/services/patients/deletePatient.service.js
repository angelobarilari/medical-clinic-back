import { database } from "../../data-source"
import { AppError } from "../../errors/AppError"

const deletePatientService = async (name) => {
    if (!name) {
        throw new AppError(400, {
            error: "error",
            message: "Missing data"
        })
    }

    const res = await database.query(
        `DELETE FROM
            patient
        WHERE
            name = $1;`,
        [name]
    )

    if(res.rowCount === 0) throw new AppError(404, {
            error: "error",
            message: "Patient not found"
        })
}

export default deletePatientService
