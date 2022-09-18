import deleteAdministratorService from "../../services/admistrators/deleteAdministrator.service.js";

const deleteAdministratorController = async (req, res) => {
    const { id } = req.params

    try {
        await deleteAdministratorService(id)
        return res.status(200).json({
            message: "Administrator deleted with succes"
        })
    } catch (error) {
        return res.status(error.statusCode).json(error.message)
    }
}

export default deleteAdministratorController

