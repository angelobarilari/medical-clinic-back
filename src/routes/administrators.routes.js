import { Router } from "express";

import createAdministratorController from "../controllers/admistrators/createAdministrator.controller.js";
import deleteAdministratorController from "../controllers/admistrators/deleteAdministrator.controller.js";
import listAdministratorsController from "../controllers/admistrators/listAdministrators.controller.js";
import listAnAdministratorController from "../controllers/admistrators/listAnAdministrator.controller.js";
import updateAdministratorController from "../controllers/admistrators/updateAdministrator.controller.js";
import authAdm from "../middlewares/authAdm.middleware.js"
import authToken from "../middlewares/authToken.middleware.js"

const routes = Router()

export const adminsitratorRoutes = () => {
    routes.get("", authToken, authAdm, listAnAdministratorController)
    routes.get("/all", authToken, authAdm, listAdministratorsController)
    routes.post("", createAdministratorController)
    routes.patch("/:id", authToken, authAdm, updateAdministratorController)
    routes.delete("/:id", authToken, authAdm, deleteAdministratorController)

    return routes
}
