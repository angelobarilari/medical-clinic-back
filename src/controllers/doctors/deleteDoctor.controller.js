import deleteDoctorService from "../../services/doctors/deleteDoctor.service"

const deleteDoctorController = async (req, res) => {
    const { crm } = req.params
    
    try {
        await deleteDoctorService(crm)
        return res.status(200).json({
            message: "Doctor deleted with success"
        })
    } catch (error) {
        return res.status(error.statusCode).json(error.message)
    }
}

export default deleteDoctorController
