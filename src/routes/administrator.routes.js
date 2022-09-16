import { Router } from "express";

import listAdministratorController from "../controllers/admistrators/listAdministrators.controller"
import listAnAdministratorController from "../controllers/admistrators/listAdministrators.controller"
import createAdministratorController from "../controllers/admistrators/createAdministrator.controller"
import updateAdministratorController from "../controllers/admistrators/updateAdministrator.controller"
import deleteAdministratorController from "../controllers/admistrators/deleteAdministrator.controller"

const routes = Router()

export const administratorRoutes = () => {
    routes.get("/:id", listAnAdministratorController)
    routes.get("/", listAdministratorController)
    routes.post("", createAdministratorController)
    routes.patch("/:id", updateAdministratorController)
    routes.delete("/:id", deleteAdministratorController)
    
    return routes
}

