import { database } from "../../data-source"
import { AppError } from "../../errors/AppError"

const deleteAppointmentService = async (id) => {
    if (!id) {
        throw new AppError(400, {
            error: "error",
            message: "Missing id"
        })
    }

    const res = await database.query(
        `DELETE FROM
            appointment
        WHERE
            id = $1
        `, 
        [id]
    )

    if (res.rowCount === 0) throw new AppError(404, {
        error: "error",
        message: "Appointment not found"
    })
}

export default deleteAppointmentService

