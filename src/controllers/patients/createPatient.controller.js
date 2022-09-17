import createPatientService from "../../services/patients/createPatient.service"

const createPatientController = async (req, res) => {
    const { name, rg, phone, email, responsible_id } = req.body

    try {
        const patient = await createPatientService(name, rg, phone, email, responsible_id)
        return res.status(201).json(patient)
    } catch (error) {
        return res.status(300).json(error.message)
    }
}

export default createPatientController
