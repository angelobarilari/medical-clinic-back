import { doctorRoutes } from "./doctors.routes"

const appRoutes = (app) => {
    app.use("/doctors", doctorRoutes())
}

export default appRoutes

