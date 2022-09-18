import { Router } from "express";

import createAppointmentController from "../controllers/appointment/createAppointment.controller.js";
import deleteAppointmentController from "../controllers/appointment/deleteAppointment.controller.js";
import listAppointmentByNameController from "../controllers/appointment/listappointmentByName.controller.js";
import listAppointmentsController from "../controllers/appointment/listAppointments.controller.js";
import updateAppointmentController from "../controllers/appointment/updateAppointment.controller.js";
import authAdm from "../middlewares/authAdm.middleware.js";
import authUser from "../middlewares/authToken.middleware.js";

const routes = Router()

export const appointmentRoutes = () => {
    routes.get("", authUser, authAdm, listAppointmentByNameController)
    routes.get("/all", authUser, authAdm, listAppointmentsController)
    routes.post("", authUser, authAdm, createAppointmentController)
    routes.patch("/:id", authUser, authAdm, updateAppointmentController)
    routes.delete("/:id", authUser, authAdm, deleteAppointmentController)

    return routes
}


