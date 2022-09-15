import { database } from "../../data-source"
import { AppError } from "../../errors/AppError"

const deleteDoctorService = async (crm) => {
    if (!crm) {
        throw new AppError(400, {
            error: "error",
            message: "Missing data"
        })
    }

    const res = await database.query(
        `DELETE FROM
            doctor
        WHERE
            crm = $1;`,
        [crm]
    )

    if(res.rowCount === 0){
        throw new AppError(404, "Doctor not found")
    }
}

export default deleteDoctorService

