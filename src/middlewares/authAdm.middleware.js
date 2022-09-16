import jwt from "jsonwebtoken"
import { database } from "../data-source"
import { AppError } from "../errors/AppError"

const authAdm= (req, res, next) => {
    let token = req.headers.authorization
    if (!token) return res.status(401).json({
        message: "Missing authorization token"
    })


    token = token.split(" ")[1]

    jwt.verify(token, "SECRET_KEY", async (error, decoded) => {
        if (error) return res.status(401).json({
                message: "Invalid token"
            })

        const id = decoded.sub
        const user = await database.query(
            `SELECT
                *
            FROM
                administrator
            WHERE
                id = $1`, 
            [id]
        )

        if (user.rowCount === 0) throw new AppError(401, {
            error: "error",
            message: "You are not administrator"
        })

        next()
    })
}

export default authAdm

