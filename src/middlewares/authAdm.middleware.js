import jwt from "jsonwebtoken"
import { database } from "../data-source.js"
import { AppError } from "../errors/AppError.js"
import "dotenv/config"

const authAdm= (req, res, next) => {
    try {
        let token = req.headers.authorization
        
        if (!token) throw new AppError(400, "Missing authorization token")

        token = token.split(" ")[1]

        jwt.verify(token, process.env.JWT_SECRET, async (error, decoded) => {
            if (error) return res.status(401).json({
                    message: "Invalid token"
                })
    
            try {                
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
    
                if (user.rowCount === 0) throw new AppError(401, "You are not administrator")
    
            } catch (error) {
                return res.status(error.statusCode).json({
                    error: "error",
                    message: error.message
                })
            }
    
            next()
        })
    } catch (error) {
        return res.status(error.statusCode).json({
            error: "error",
            message: error.message
        })
    }
/*
    jwt.verify(token, process.env.JWT_SECRET, async (error, decoded) => {
        if (error) return res.status(401).json({
                message: "Invalid token"
            })

        try {                
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

            if (user.rowCount === 0) throw new AppError(401, "You are not administrator")

        } catch (error) {
            return res.status(error.statusCode).json({
                message: error.message
            })
        }

        next()
    })*/
}

export default authAdm

