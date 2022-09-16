import deletePatientService from "../../services/patients/deletePatient.service";

const deletePatientController = async (req, res) => {
    const { name } = req.body

    try {
        await deletePatientService(name)
        return res.status(204).send()
    } catch (error) {
        return res.status(error.statusCode).json(error.message)
    }
}

export default deletePatientController

