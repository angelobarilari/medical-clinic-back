import createAppointmentService from "../../services/appointments/createAppointment.service";

const createAppointmentController = async (req, res) => {
    const {
        doctorCRM, 
        patientName, 
        patientID, 
        patientRG, 
        date, 
        hour, 
        reqSpecialization
    } = req.body
    
    try {
        const appointment = await createAppointmentService(
            doctorCRM, 
            patientName, 
            patientID, 
            patientRG, 
            date, 
            hour, 
            reqSpecialization
        )
        return res.status(201).json(appointment)
    } catch (error) {
        return res.status(error.statusCode).json(error.message)
    }
}

export default createAppointmentController

