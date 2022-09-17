import { Router } from "express";

import createDoctorController from "../controllers/doctors/createDoctor.controller.js"
import deleteDoctorController from "../controllers/doctors/deleteDoctor.controller.js";
import listDoctorByCRMController from "../controllers/doctors/listDoctorByCRM.controller.js";
import listDoctorController from "../controllers/doctors/listDoctors.controller.js";
import updateDoctorController from "../controllers/doctors/updateDoctor.controller.js";
import authAdm from "../middlewares/authAdm.middleware.js";
import authUser from "../middlewares/authToken.middleware.js";

const routes = Router()

export const doctorRoutes = () => {
    routes.get("", listDoctorController)
    routes.get("/:crm", listDoctorByCRMController)
    routes.post("", authUser, authAdm, createDoctorController)
    routes.patch("/:crm", authUser, authAdm, updateDoctorController)
    routes.delete("/:crm", authUser, authAdm, deleteDoctorController)

    return routes
}

