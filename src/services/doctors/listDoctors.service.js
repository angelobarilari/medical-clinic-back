import { database } from "../../data-source";

const listDoctorService = async () => {
    const res = await database.query(
        `SELECT
            *
        FROM
            doctor`,
        []
    )
    return res.rows
}

export default listDoctorService

