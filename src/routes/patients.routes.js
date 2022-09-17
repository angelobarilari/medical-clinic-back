import { Router } from "express"

import createPatientController from "../controllers/patients/createPatient.controller"
import deletePatientController from "../controllers/patients/deletePatient.controller"
import listAPatientController from "../controllers/patients/listAPatient.controller"
import listPatientsController from "../controllers/patients/listPatients.controller"
import updatePatientcontroller from "../controllers/patients/updatePatient.controller"
import authAdm from "../middlewares/authAdm.middleware"
import authUser from "../middlewares/authToken.middleware"

const routes = Router()

export const patientRoutes = () => {
    routes.get("", authUser, listAPatientController)
    routes.get("/all", authUser, authAdm, listPatientsController)
    routes.post("", authUser, authAdm, createPatientController)
    routes.patch("", authUser, authAdm, updatePatientcontroller)
    routes.delete("/:rg", authUser, authAdm, deletePatientController)

    return routes
}

