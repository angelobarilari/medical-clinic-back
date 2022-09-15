import { database } from "../../data-source";

const listDoctorService = async () => {
    try {
        const res = await database.query(
            `SELECT
                *
            FROM
                doctor`,
            []
        )

        return res.rows
    } catch (error) {
        throw new Error(error)
    }
}

export default listDoctorService

