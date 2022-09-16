import userLoginService from "../../services/sessions/userLogin.service";

const userLoginController = async (req, res) => {
    const { phone, email, password } = req.body

    try {
        const userLogin = await userLoginService(phone, email, password)
        return res.json({
            token: userLogin
        })
    } catch (error) {
        return res.status(error.statusCode).json(error.message)
    }

}

export default userLoginController

