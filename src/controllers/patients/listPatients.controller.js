import listPatientsService from "../../services/patients/listPatients.service.js";

const listPatientsController = async (req, res) => {
    const patients = await listPatientsService()
    return res.status(200).json(patients)
}

export default listPatientsController

