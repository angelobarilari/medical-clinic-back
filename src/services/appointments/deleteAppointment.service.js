import { database } from "../../data-source.mjs"
import { AppError } from "../../errors/AppError.js"

const deleteAppointmentService = async (id) => {
    if (!id) {
        throw new AppError(400, {
            error: "error",
            message: "Missing id"
        })
    }

    const appointment = await database.query(
        `SELECT
            *
        FROM
            appointment
        WHERE
            id = $1`,
        [id]
    )

    const cancelValidation = appointment.rows.some(appointment => {
        if (appointment.id === id &&
            appointment.iscancelled === false) {
                const date = appointment.date
                const hour = appointment.hour

                const year = date.getFullYear()
                const month = date.getMonth()
                const day = date.getDate()
                const hours = Number(hour.slice(0, 2)) - 3 
                const minutes = hour.slice(3, 5)
    
                const databaseFormatedDates = new Date(year, month, day, hours, minutes)
                const databaseDatesToHours = Date.parse(databaseFormatedDates)
                const cancellationAttemptTime = Date.now()

                const differenceInHours = (databaseDatesToHours - cancellationAttemptTime) / 1000 / 60 / 60

                if (differenceInHours <= 12) return false

                return true
        }
    })

    if (!cancelValidation) throw new AppError(400, {
        error: "error",
        message: "You cannot cancel an appointment with less than 12 hours to go"
    })

    const res = await database.query(
        `UPDATE
            appointment
        SET
            iscancelled = true
        WHERE
            id = $1`, 
        [id]
    )
        
    if (res.rowCount === 0) throw new AppError(404, {
        error: "error",
        message: "Appointment not found"
    })

    return res.rows
}

export default deleteAppointmentService

