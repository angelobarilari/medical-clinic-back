import { Router } from "express";

import createAppointmentController from "../controllers/appointment/createAppointment.controller";
import deleteAppointmentController from "../controllers/appointment/deleteAppointment.controller";
import listAppointmentByNameController from "../controllers/appointment/listappointmentByName.controller";
import listAppointmentsController from "../controllers/appointment/listAppointments.controller";
import updateAppointmentController from "../controllers/appointment/updateAppointment.controller";
import authUser from "../middlewares/authToken.middleware";
import authAdm from "../middlewares/authAdm.middleware"

const routes = Router()

export const appointmentRoutes = () => {
    routes.get("", authUser, authAdm, listAppointmentByNameController)
    routes.get("/all", authUser, authAdm, listAppointmentsController)
    routes.post("", authUser, createAppointmentController)
    routes.patch("/:id", authUser, updateAppointmentController)
    routes.delete("/:id", authUser, deleteAppointmentController)

    return routes
}


