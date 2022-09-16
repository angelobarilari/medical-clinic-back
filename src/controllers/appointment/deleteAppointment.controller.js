import deleteAppointmentService from "../../services/appointments/deleteAppointment.service"

const deleteAppointmentController = async (req, res) => {
    const { id } = req.params

    try {
        await deleteAppointmentService(id)
        return res.status(200).json({
            message: "Appointment deleted with success"
        })
    } catch (error) {
        return res.status(error.statusCode).json(error.message)
    }
}

export default deleteAppointmentController

