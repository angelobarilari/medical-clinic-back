import listDoctorService from "../../services/doctors/listDoctors.service";

const listDoctorController = async (req, res) => {
    try {
        const doctors = await listDoctorService()
        return res.status(200).json(doctors)
    } catch (error) {
        return res.status(404).json(error)
    }
}

export default listDoctorController

