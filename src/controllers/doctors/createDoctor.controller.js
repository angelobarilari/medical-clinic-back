import createDoctorService from "../../services/doctors/createDoctor.service"

const createDoctorController = async (req, res) => {
    const { name, crm, phone, email, specialization, password } = req.body

    try {
        const doctor = await createDoctorService(name, crm, phone, email, specialization, password)
        return res.status(201).json(doctor)
    } catch (error) {
        return res.status(error.statusCode).json(error.message)
    }
}

export default createDoctorController
