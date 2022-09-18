import listDoctorByCRMService from "../../services/doctors/listDoctorByCRM.service.js"

const listDoctorByCRMController = async (req, res) => {
    const { crm } = req.params
    try {
        const doctor = await listDoctorByCRMService(crm)
        return res.status(200).json(doctor)
    } catch (error) {
        return res.status(error.statusCode).json(error.message)
    }
}

export default listDoctorByCRMController