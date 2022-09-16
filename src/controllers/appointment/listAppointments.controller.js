import listAppointmentsService from "../../services/appointments/listAppointments.service"

const listAppointmentsController = async (req, res) => {
    const appointments = await listAppointmentsService()
    return res.status(200).json(appointments)
}

export default listAppointmentsController

