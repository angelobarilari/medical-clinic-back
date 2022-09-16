import listResponsiblesService from "../../services/responsibles/listResponsibles.service"

const listResponsiblesController = async (req, res) => {
    const responsibles = await listResponsiblesService()
    return res.status(200).json(responsibles)
}

export default listResponsiblesController