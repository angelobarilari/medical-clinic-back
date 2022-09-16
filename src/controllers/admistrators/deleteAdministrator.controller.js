import deleteAdministratorService from "../../services/admistrators/deleteAdministrator.service";

const deleteAdministratorController = async (req, res) => {
    const { id } = req.params

    try {
        await deleteAdministratorService(id)
        return res.status(404).json({
            message: "Administrator deleted with succes"
        })
    } catch (error) {
        return res.status(error.statusCode).json(error.message)
    }
}

export default deleteAdministratorController

