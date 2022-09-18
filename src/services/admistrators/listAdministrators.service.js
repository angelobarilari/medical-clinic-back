import { database } from "../../data-source.js";

const listAdministratorsService = async () => {
    const res = await database.query(
        `SELECT
            *
        FROM
            administrator`, 
        []
    )

    return res.rows
}

export default listAdministratorsService

