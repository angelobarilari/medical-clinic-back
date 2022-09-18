import listDoctorService from "../../services/doctors/listDoctors.service.js";

const listDoctorController = async (req, res) => {
    const doctors = await listDoctorService()
    return res.status(200).json(doctors)
}

export default listDoctorController

