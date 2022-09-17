import { Router } from "express";

import createAppointmentController from "../controllers/appointment/createAppointment.controller";
import deleteAppointmentController from "../controllers/appointment/deleteAppointment.controller";
import listAppointmentByNameController from "../controllers/appointment/listappointmentByName.controller";
import listAppointmentsController from "../controllers/appointment/listAppointments.controller";
import updateAppointmentController from "../controllers/appointment/updateAppointment.controller";
import authAdm from "../middlewares/authAdm.middleware";
import authUser from "../middlewares/authToken.middleware";

const routes = Router()

export const appointmentRoutes = () => {
    routes.get("", authUser, authAdm, listAppointmentByNameController)
    routes.get("/all", authUser, authAdm, listAppointmentsController)
    routes.post("", authUser, authAdm, createAppointmentController)
    routes.patch("/:id", authUser, authAdm, updateAppointmentController)
    routes.delete("/:id", authUser, authAdm, deleteAppointmentController)

    return routes
}


