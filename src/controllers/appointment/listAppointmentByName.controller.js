import listAppointmentByNameService from "../../services/appointments/listAppointmentByName.service.js"

const listAppointmentByNameController = async (req, res) => {
    const { name } = req.body
    
    try {
        const appointment = await listAppointmentByNameService(name)
        return res.status(200).json(appointment)
    } catch (error) {
        return res.status(error.statusCode).json(error.message)
    }

}

export default listAppointmentByNameController

