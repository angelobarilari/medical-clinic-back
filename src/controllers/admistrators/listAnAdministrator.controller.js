import listAnAdministratorService from "../../services/admistrators/listAnAdministrators.service";

const listAnAdministratorController = async (req, res) => {
    const { id } = req.params

    try {
        const administrator = await listAnAdministratorService(id)
        return res.status(200).json(administrator)
    } catch (error) {
        return res.status(error.statusCode).json(error.message)
    }
}

export default listAnAdministratorController

