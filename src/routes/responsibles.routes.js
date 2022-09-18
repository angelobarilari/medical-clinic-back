import { Router } from "express";

import createResponsibleController from "../controllers/responsibles/createResponsible.controller.js";
import deleteResponsibleController from "../controllers/responsibles/deleteResponsible.controller.js";
import listAResponsibleController from "../controllers/responsibles/listAResponsible.controllers.js";
import listResponsiblesController from "../controllers/responsibles/listResponsibles.controller.js";
import updateResponsibleController from "../controllers/responsibles/updateResponsible.controller.js";
import authAdm from "../middlewares/authAdm.middleware.js";
import authUser from "../middlewares/authToken.middleware.js";

const routes = Router()

export const responsibleRoutes = () => {
    routes.get("", authUser, listAResponsibleController)
    routes.get("/all", authUser, authAdm, listResponsiblesController)
    routes.post("", authUser, authAdm, createResponsibleController)
    routes.patch("", authUser, authAdm, updateResponsibleController)
    routes.delete("", authUser, authAdm, deleteResponsibleController)

    return routes
}


