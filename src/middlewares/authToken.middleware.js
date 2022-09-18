import jwt from "jsonwebtoken"
import { AppError } from "../errors/AppError.js"
import "dotenv/config"

const authUser = (req, res, next) => {
    let token = req.headers.authorization

    if (!token) return new AppError(401, "Missing authorization token")

    token = token.split(" ")[1]

    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
        if (error) {
            return res.status(401).json({
                message: "Invalid token"
            })
        }
        next()
    })
}

export default authUser

