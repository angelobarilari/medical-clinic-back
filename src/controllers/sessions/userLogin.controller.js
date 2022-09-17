import userLoginService from "../../services/sessions/userLogin.service";

const userLoginController = async (req, res) => {
    const { phone, email, password } = req.body

    try {
        const userLogin = await userLoginService(phone, email, password)
        return res.json({
            token: userLogin
        })
    } catch (error) {
        return res.status(404).json(error.message)
    }

}

export default userLoginController

