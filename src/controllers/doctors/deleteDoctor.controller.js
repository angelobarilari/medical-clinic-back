import deleteDoctorService from "../../services/doctors/deleteDoctor.service"

const deleteDoctorController = async (req, res) => {
    const { crm } = req.params
    
    try {
        await deleteDoctorService(crm)
        return res.status(204).send()
    } catch (error) {
        return res.status(error.statusCode).json(error.message)
    }
}

export default deleteDoctorController
