import deleteResponsibleService from "../../services/responsibles/deleteResponsible.service"

const deleteResponsibleController = async (req, res) => {
    const { id } = req.params

    try {
        console.log("ENTROU NO TRY")
        await deleteResponsibleService(id)
        return res.status(200).json({
            message: "Responsible deleted with success"
        })
    } catch (error) {
        console.log("SAIU NO CATCH")
        return res.status(404).json(error.message)
    }
}

export default deleteResponsibleController

