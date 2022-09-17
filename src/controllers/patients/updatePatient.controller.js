import updatePatientService from "../../services/patients/updatePatient.service"

const updatePatientController = async (req, res) => {
    const newPatientData = req.body
    const { patientIdentification } = req.body
    delete newPatientData.patientIdentification

    try {
        const updatedPatient = await updatePatientService(patientIdentification, newPatientData)
        return res.status(200).json({
            message: "Patient updated",
            updatedPatient
        })
    } catch (error) {
        return res.status(error.statusCode).json(error.message)
    }
}

export default updatePatientController


