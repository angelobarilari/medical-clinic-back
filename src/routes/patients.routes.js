import { Router } from "express"

import createPatientController from "../controllers/patients/createPatient.controller.js"
import deletePatientController from "../controllers/patients/deletePatient.controller.js"
import listAPatientController from "../controllers/patients/listAPatient.controller.js"
import listPatientsController from "../controllers/patients/listPatients.controller.js"
import updatePatientcontroller from "../controllers/patients/updatePatient.controller.js"
import authAdm from "../middlewares/authAdm.middleware.js"
import authUser from "../middlewares/authToken.middleware.js"

const routes = Router()

export const patientRoutes = () => {
    routes.get("", authUser, listAPatientController)
    routes.get("/all", authUser, authAdm, listPatientsController)
    routes.post("", authUser, authAdm, createPatientController)
    routes.patch("", authUser, authAdm, updatePatientcontroller)
    routes.delete("/:rg", authUser, authAdm, deletePatientController)

    return routes
}

