import { Router } from "express";

import createAppointmentController from "../controllers/appointment/createAppointment.controller";
import deleteAppointmentController from "../controllers/appointment/deleteAppointment.controller";
import listAppointmentByNameController from "../controllers/appointment/listappointmentByName.controller";
import listAppointmentsController from "../controllers/appointment/listAppointments.controller";
import updateAppointmentController from "../controllers/appointment/updateAppointment.controller";

const routes = Router()

export const appointmentRoutes = () => {
    routes.get("", listAppointmentByNameController)
    routes.get("/all", listAppointmentsController)
    routes.post("", createAppointmentController)
    routes.patch("/:id", updateAppointmentController)
    routes.delete("/:id", deleteAppointmentController)

    return routes
}


