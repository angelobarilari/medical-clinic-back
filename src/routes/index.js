import { adminsitratorRoutes } from "./administrators.routes.js"
import { appointmentRoutes } from "./appointments.routes.js"
import { doctorRoutes } from "./doctors.routes.js"
import { patientRoutes } from "./patients.routes.js"
import { responsibleRoutes } from "./responsibles.routes.js"
import { sessionRoutes } from "./sessions.routes.js"

const appRoutes = (app) => {
    app.use("/doctors", doctorRoutes())
    app.use("/patients", patientRoutes())
    app.use("/appointment", appointmentRoutes())
    app.use("/responsibles", responsibleRoutes())
    app.use("/login", sessionRoutes())
    app.use("/administrators", adminsitratorRoutes())
}

export default appRoutes

