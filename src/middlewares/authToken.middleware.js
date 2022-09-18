import jwt from "jsonwebtoken"
import { AppError } from "../errors/AppError.js"
import "dotenv/config"

const authUser = (req, res, next) => {
    try {
        let token = req.headers.authorization
    
        if (!token) throw new AppError(400, "Missing authorization token")

        token = token.split(" ")[1]

        jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
            if (error) return res.status(401).json({
                message: "Invalid token"
            })

            next()
        })
    } catch (error) {
        return res.status(error.statusCode).json({
            error: "error",
            message: error.message
        })
    }

}

export default authUser

