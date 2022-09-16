import { database } from "../../data-source"
import { AppError } from "../../errors/AppError"

const listAppointmentByNameService = async (name) => {
    if (!name) {
        throw new AppError(400, {
            error: "error",
            message: "Must enter with a name"
        })
    }

    const res = await database.query(
        `SELECT
            *
        FROM
            appointment
        WHERE
            patient_name = $1`,
        [name]
    )

    if (res.rowCount === 0) throw new AppError(404,{
        error: "error",
        message: "Appointments not found"
    })

    return res.rows
}

export default listAppointmentByNameService

