import { database } from "../../data-source"
import { AppError } from "../../errors/AppError"

const listAResponsibleService = async (name) => {
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
            responsible
        WHERE
            name = $1`, 
        [name]
    )

    if (res.rowCount === 0) throw new AppError(404, {
        error: "error",
        message: "Responsible not found"
    })

    return res.rows[0]
}

export default listAResponsibleService

