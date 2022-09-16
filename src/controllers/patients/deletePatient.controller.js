import deletePatientService from "../../services/patients/deletePatient.service";

const deletePatientController = async (req, res) => {
    const { rg } = req.params

    try {
        await deletePatientService(rg)
        return res.status(200).json({
            message: "Patient deleted with success"
        })
    } catch (error) {
        return res.status(error.statusCode).json(error.message)
    }
}

export default deletePatientController

