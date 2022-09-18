import { database } from "../../data-source.mjs"
import { AppError } from "../../errors/AppError.js"

const deleteResponsibleService = async (name) => {
    if (!name) {
        throw new AppError(400, {
            error: "error",
            message: "You must enter with a name"
        })
    }

    const res = await database.query(
        `DELETE FROM
            responsible
        WHERE
            name = $1;`,
        [name]
    )

    if(res.rowCount === 0) throw new AppError(404, {
            error: "error",
            message: "Responsible not found"
        })
}

export default deleteResponsibleService
