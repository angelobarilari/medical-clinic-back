import listAdministratorsService from "../../services/admistrators/listAdministrators.service.js";

const listAdministratorsController = async (req, res) => {
    const administrators = await listAdministratorsService()
    return res.status(200).json(administrators)
}

export default listAdministratorsController
