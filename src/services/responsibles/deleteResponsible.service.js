import { database } from "../../data-source"
import { AppError } from "../../errors/AppError"

const deleteResponsibleService = async (id) => {
    if (!id) {
        throw new AppError(400, {
            error: "error",
            message: "You must enter with responsible ID"
        })
    }

    try {
        console.log("entrou")
        const res = await database.query(
            `DELETE FROM
                responsible
            WHERE
                id = $1;`,
            [id]
        )
    
        if(res.rowCount === 0) throw new AppError(404, {
                error: "error",
                message: "Responsible not found"
        })
        
    } catch (error) {
        console.log(error.message)
        throw new AppError(300, {
            error: "error",
            message: error.message
        })
    }
}

export default deleteResponsibleService
