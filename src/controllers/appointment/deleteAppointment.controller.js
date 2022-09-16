import deleteAppointmentService from "../../services/appointments/deleteAppointment.service"

const deleteAppointmentController = async (req, res) => {
    const { id } = req.params

    try {
        await deleteAppointmentService(id)
        return res.status(204).send()
    } catch (error) {
        return res.status(error.statusCode).json(error.messsage)
    }
}

export default deleteAppointmentController

