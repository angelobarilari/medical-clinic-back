import { appointmentRoutes } from "./appointments.routes"
import { doctorRoutes } from "./doctors.routes"
import { patientRoutes } from "./patients.routes"

const appRoutes = (app) => {
    app.use("/doctors", doctorRoutes())
    app.use("/patients", patientRoutes())
    app.use("/appointment", appointmentRoutes())
}

export default appRoutes

