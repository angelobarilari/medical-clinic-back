import listAPatientService from "../../services/patients/listAPatient.service.js"

const listAPatientController = async (req, res) => {
    const { name } = req.body
    try {
        const patient = await listAPatientService(name)
        return res.status(200).json(patient)
    } catch (error) {
        return res.status(error.statusCode).json({
            message: error.message
        })
    }
}

export default listAPatientController

