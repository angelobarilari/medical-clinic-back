import updateDoctorService from "../../services/doctors/updateDoctor.service"

const updateDoctorController = async (req, res) => {
    const { crm } = req.params
    const doctorData = req.body
    console.log(req.body)
    try {
        const updatedDoctor = await updateDoctorService(crm, doctorData)
        return res.status(200).json({
            message: "Doctor updated",
            updatedDoctor
        })
    } catch (error) {
        return res.status(error.statusCode).json(error.message)
    }
}

export default updateDoctorController
