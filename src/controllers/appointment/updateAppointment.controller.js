import updateAppointmentService from "../../services/appointments/updateAppointment.service";

const updateAppointmentController = async (req, res) => {
    const newAppointmentData = req.body
    const { id } = req.params

    try {
        const updatedAppointment = await updateAppointmentService(id, newAppointmentData)
        return res.status(200).json({
            message: "Appointment updated",
            updatedAppointment
        })
    } catch (error) {
        return res.status(error.statusCode).json(error.message)
    }
}

export default updateAppointmentController

