export class AppError extends Error {
    statusCode
    constructor(statusCode, message) {
        super()
        this.statusCode = statusCode
        this.message = message
    }
}

export const handleError = (error, res) => {
    const { statusCode, message } = error

    return res.status(statusCode).json({
        status: "error",
        statusCode,
        message
    })
}