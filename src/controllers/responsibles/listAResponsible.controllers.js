import listAResponsibleService from "../../services/responsibles/listAResponsible.service";

const listAResponsibleController = async (req, res) => {
    const { name } = req.body

    try {
        const responsbile = await listAResponsibleService(name)
        return res.status(200).json(responsbile)
    } catch (error) {
        return res.status(error.statusCode).json({
            message: error.message
        })
    }
}

export default listAResponsibleController

