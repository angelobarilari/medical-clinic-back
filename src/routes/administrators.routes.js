import { Router } from "express";

import createAdministratorController from "../controllers/admistrators/createAdministrator.controller";
import deleteAdministratorController from "../controllers/admistrators/deleteAdministrator.controller";
import listAdministratorsController from "../controllers/admistrators/listAdministrators.controller";
import listAnAdministratorController from "../controllers/admistrators/listAnAdministrator.controller";
import updateAdministratorController from "../controllers/admistrators/updateAdministrator.controller";
import authAdm from "../middlewares/authAdm.middleware"
import authToken from "../middlewares/authToken.middleware"

const routes = Router()

export const adminsitratorRoutes = () => {
    routes.get("", authToken, authAdm, listAnAdministratorController)
    routes.get("/all", authToken, authAdm, listAdministratorsController)
    routes.post("", createAdministratorController)
    routes.patch("/:id", authToken, authAdm, updateAdministratorController)
    routes.delete("/:id", authToken, authAdm, deleteAdministratorController)

    return routes
}
