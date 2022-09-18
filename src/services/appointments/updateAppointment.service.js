import { database } from "../../data-source.mjs"
import { AppError } from "../../errors/AppError.js"

const updateAppointmentService = async (appointmentID, newAppointmentData) => {
    const { doctor_crm, patient_id, patient_rg, patient_name, date, hour } = newAppointmentData

    const verifyValues = [doctor_crm, patient_name, patient_id, date, hour]

    verifyValues.forEach(value => {
        if (!value) {
            throw new AppError(400, {
                error: "error",
                message: "Missing data"
            })
        }
    });

    const reqHours = Number(hour.slice(0, 2)) - 3 
    const reqMinutes = hour.slice(3, 5)
    const dateValues = `${date}, ${reqHours}:${reqMinutes}`
    const reqFormatedDate = new Date(dateValues);

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
            if (appointment.iscancelled === false) {
                const date = appointment.date
                const hour = appointment.hour
                
                const year = date.getFullYear()
                const month = date.getMonth()
                const day = date.getDate()
                const hours = Number(hour.slice(0, 2)) - 3 
                const minutes = hour.slice(3, 5)
                
                function basicValidation() {
                    if (year === reqFormatedDate.getFullYear()) {
                        if (month === reqFormatedDate.getMonth()) {
                            if (day === reqFormatedDate.getDate()) {
                                return true
                            }
                        }
                    }
                }

                const databaseFormatedDates = new Date(year, month, day, hours, minutes)

                if (basicValidation()) {
                    console.log("tá entrando no basic")
                    const databaseDatesToMins = (databaseFormatedDates.getHours() + 3) * 60 + (databaseFormatedDates.getMinutes())
                    const reqDatesToMins = (reqFormatedDate.getHours() + 3) * 60 + (reqFormatedDate.getMinutes())
            
                    const differenceInMinutes = databaseDatesToMins - reqDatesToMins
            
                    if (differenceInMinutes > -60 ||
                        differenceInMinutes < 60) return false
            
                    return true
                }
                return true
            }
        });

        if (!scheduleValidation) throw new AppError(409, {
            error: "error",
            message: "Another schedule at this time"
        })

        const remarkValidation = appointments.some(appointment => {
            if (appointment.id === appointmentID &&
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
                
                if (Math.sign(differenceInHours) === NaN ||
                    Math.sign(differenceInHours) === -1 ||
                    Math.sign(differenceInHours) === -0
                    ) throw new AppError(400, {
                        error: "error",
                        message: "Inform a a valid date"
                    })

                if (differenceInHours <= 12) return false

                return true
            }
        });

        if (!remarkValidation) throw new AppError(400, {
            error: "error",
            message: "You cannot remark an appointment with less than 12 hours to go"
        })
    }
     
    try {
        let query = "UPDATE appointment SET "
        const keys = Object.keys(newAppointmentData)
        const values = Object.values(newAppointmentData)

        keys.forEach((key, index) => {
            query += `${key} = \$${index += 1}, `
        });

        query = query.slice(0, -2)

        query += ` WHERE id = \$${keys.length += 1} RETURNING *;`

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
