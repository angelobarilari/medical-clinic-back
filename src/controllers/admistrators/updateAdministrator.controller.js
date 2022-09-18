import updateAdministratorService from "../../services/admistrators/updateAdministrator.service.js";

const updateAdministratorController = async (req, res) => {
    const { id } = req.params
    const administratorData = req.body

    try {
        const updatedAdministrator = await updateAdministratorService(id, administratorData)
        return res.status(200).json({
            message: "Administrator updated",
            updatedAdministrator
        })
    } catch (error) {
        return res.status(300).json(error.message)
    }
}

export default updateAdministratorController

