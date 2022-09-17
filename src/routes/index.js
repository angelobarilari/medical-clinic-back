import { adminsitratorRoutes } from "./administrators.routes"
import { appointmentRoutes } from "./appointments.routes"
import { doctorRoutes } from "./doctors.routes"
import { patientRoutes } from "./patients.routes"
import { responsibleRoutes } from "./responsibles.routes"
import { sessionRoutes } from "./sessions.routes"

const appRoutes = (app) => {
    app.use("/doctors", doctorRoutes())
    app.use("/patients", patientRoutes())
    app.use("/appointment", appointmentRoutes())
    app.use("/responsibles", responsibleRoutes())
    app.use("/login", sessionRoutes())
    app.use("/administrators", adminsitratorRoutes())
}

export default appRoutes

