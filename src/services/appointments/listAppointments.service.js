import { database } from "../../data-source.mjs";

const listAppointmentsService = async () => {
    const res = await database.query(
        `SELECT
            *
        FROM
            appointment`,
        []
    )

    return res.rows
}

export default listAppointmentsService

