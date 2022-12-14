import deleteResponsibleService from "../../services/responsibles/deletePatient.service.js"

const deleteResponsibleController = async (req, res) => {
    const { name } = req.body

    try {
        await deleteResponsibleService(name)
        return res.status(200).json({
            message: "Responsible deleted with success"
        })
    } catch (error) {
        return res.status(error.statusCode).json(error.message)
    }
}

export default deleteResponsibleController

