import { database } from "../../data-source"

const listResponsiblesService = async () => {
    const res = await database.query(
        `SELECT
            *
        FROM
            responsible`, 
        []
    )

    return res.rows
}

export default listResponsiblesService
