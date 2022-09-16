import { database } from "../../data-source";
import { AppError } from "../../errors/AppError";

const createAppointmentService = async (
    doctorCRM, 
    patientName, 
    patientID, 
    patientRG, 
    date, 
    hour, 
    reqSpecialization,
    ) => {
    const verifyValues = [doctorCRM, patientName, patientID, date, hour, reqSpecialization]
    
    verifyValues.forEach(value => {
        if (!value) {
            throw new AppError(400, {
                error: "error",
                message: "Missing data"
            })
        }
    });

    const doctorData = await database.query(
        `SELECT
            specialization, isavailable
        FROM
            doctor
        WHERE
            crm = $1`, 
        [doctorCRM]
    )
    
    const doctorIsAvailable = doctorData.rows[0].isavailable
    const doctorSpecialization = doctorData.rows[0].specialization

    if (!doctorIsAvailable) throw new AppError(400, {
            error: "error",
            message: "Doctor is not available"
        })

    if (doctorSpecialization !== reqSpecialization) throw new AppError(400, {
            error: "error",
            message: "Doctor does not have this specialization"
        }) 
        
    try {
        const res = await database.query(
            `INSERT INTO
                appointment(doctor_crm, patient_name, patient_id, patient_rg, date, hour)
            VALUES
                ($1, $2, $3, $4, $5, $6)
            RETURNING *;`,
            [doctorCRM, patientName, patientID, patientRG, date, hour]
        )

        return res.rows[0]
    } catch (error) {
        const { detail } = error

        if (detail.includes("is not present in table")) {
            if (detail.includes("doctor")) throw new AppError(404, {
                    error: "error",
                    message: "CRM not found"
                })

            if (detail.includes("patient")) throw new AppError(404, {
                    error: "error",
                    message: "Patient ID not found"
                })

        }
    }
}

export default createAppointmentService


