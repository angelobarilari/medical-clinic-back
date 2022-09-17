import { database } from "../../data-source";
import { AppError } from "../../errors/AppError";

const listAnAdministratorService = async (id) => {
    if (!id)throw new AppError(400, {
        error: "error",
        message: "Missing ID"
    })

    const res = await database.query(
        `SELECT
            *
        FROM
            administrator
        WHERE
            id = $1`,
        [id]
    )

    if(res.rowCount === 0) throw new AppError(404, {
        error: "error",
        message: "Administrator not found"
    })

    return res.rows[0]
}

export default listAnAdministratorService
