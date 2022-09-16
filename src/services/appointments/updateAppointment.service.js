import { database } from "../../data-source"
import { AppError } from "../../errors/AppError"

const updateAppointmentService = async (appointmentID, newAppointmentData) => {
    const { doctor_crm, patient_name, patient_rg, date, hour } = newAppointmentData

    const reqHours = Number(hour.slice(0, 2)) - 3 
    const reqMinutes = hour.slice(3, 5)
    const dateValues = `${date}, ${reqHours}:${reqMinutes}`
    const reqFormatedDate = new Date(dateValues);

    if (doctor_crm) {
        const doctorAppointments = await database.query(
            `SELECT
                *
            FROM
                appointment
            WHERE
                doctor_crm = $1`,
            [doctor_crm]
        )

        const appointments = doctorAppointments.rows

        if (appointments.length > 0) {
            const scheduleValidation = appointments.some(appointment => {
                const date = appointment.date
                const hour = appointment.hour

                const year = date.getFullYear()
                const month = date.getMonth()
                const day = date.getDate()
                const hours = Number(hour.slice(0, 2)) - 3 
                const minutes = hour.slice(3, 5)

                const databaseFormatedDates = new Date(year, month, day, hours, minutes)
                const dabaseDatesToMins = (databaseFormatedDates.getHours() + 4) * 60 + (databaseFormatedDates.getMinutes())
                const reqDatesToMins = (reqFormatedDate.getHours() + 3) * 60 + (reqFormatedDate.getMinutes())

                
                if (dabaseDatesToMins < reqDatesToMins) return true

                return false
            });

            if (!scheduleValidation) throw new AppError(409, {
                error: "error",
                message: "Another schedule at this time"
            })
        }
    }
     
    try {
        let query = "UPDATE appointment SET "
        const keys = Object.keys(newAppointmentData)
        const values = Object.keys(newAppointmentData)

        keys.forEach((key, index) => {
            query += `${key} = \$${index += 1}, `
        });

        query = query.slice(0, -2)

        query += ` WHERE id = \$${keys.lenght += 1} RETURNING *;`

        const res = await database.query(
            query,
            [...values, appointmentID]
        )

        if (res.rowCount === 0) throw new AppError(404, {
            error: "error",
            message: "Appointment not found"
        })

        return res.rows[0]
    } catch (error) {
        throw new AppError(error.statusCode, {
            error: "error",
            message: error.message
        })
    }
}

export default updateAppointmentService
