import createResponsibleService from "../../services/responsibles/createResponsible.service"

const createResponsibleController = async (req, res) => {
    const { name, rg, phone, email } = req.body

    try {
        const responsible = await createResponsibleService(name, rg, phone, email)
        return res.status(201).json(responsible)
    } catch (error) {
        return res.status(error.statusCode).json(error.message)
    }
}

export default createResponsibleController

