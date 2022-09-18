import createAdministratorService from "../../services/admistrators/createAdministrator.service.js"

const createAdministratorController = async (req, res) => {
    const { email, phone, name, password } = req.body

    try {
        const administrator = await createAdministratorService(email, phone, name, password)
        return res.status(201).json(administrator)
    } catch (error) {
        return res.status(error.statusCode).json(error.message)
    }
}

export default createAdministratorController