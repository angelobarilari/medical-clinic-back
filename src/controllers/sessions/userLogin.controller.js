import userLoginService from "../../services/sessions/userLogin.service.js";

const userLoginController = async (req, res) => {
    console.log("req")
    const { phone, email, password } = req.body

    try {
        const userLogin = await userLoginService(phone, email, password)
        return res.status(200).json({
            token: userLogin
        })
    } catch (error) {
        console.log(error)
        return res.status(404).json(error.message)
    }

}

export default userLoginController

