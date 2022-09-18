import { database } from "../../data-source.js"

const listPatientsService = async () => {
    const res = await database.query(
        `SELECT
            *
        FROM
            patient`, 
        []
    )

    return res.rows
}

export default listPatientsService

