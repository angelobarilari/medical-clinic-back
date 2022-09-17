import updateResponsibleService from "../../services/responsibles/updateResponsible.service";

const updateResponsibleController = async (req, res) => {
    const newResponsibleData = req.body
    const { responsibleIdentification } = req.body
    delete newResponsibleData.responsibleIdentification

    try {
        const updatedResponsible = await updateResponsibleService(responsibleIdentification, newResponsibleData)
        return res.status(200).json({
            message: "Responsible updated",
            updatedResponsible
        })
    } catch (error) {
        return res.status(error.statusCode).json(error.message)
    }
}

export default updateResponsibleController


