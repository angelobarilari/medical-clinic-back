import { Router } from "express"

import createPatientController from "../controllers/patients/createPatient.controller"
import deletePatientController from "../controllers/patients/deletePatient.controller"
import listAPatientController from "../controllers/patients/listAPatient.controller"
import listPatientsController from "../controllers/patients/listPatients.controller"
import updatePatientcontroller from "../controllers/patients/updatePatient.controller"

const routes = Router()

export const patientRoutes = () => {
    routes.get("", listAPatientController)
    routes.get("/all", listPatientsController)
    routes.post("", createPatientController)
    routes.patch("", updatePatientcontroller)
    routes.delete("/:rg", deletePatientController)

    return routes
}

