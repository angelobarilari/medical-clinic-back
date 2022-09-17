import { Router } from "express";

import createResponsibleController from "../controllers/responsibles/createResponsible.controller";
import deleteResponsibleController from "../controllers/responsibles/deleteResponsible.controller";
import listAResponsibleController from "../controllers/responsibles/listAResponsible.controllers";
import listResponsiblesController from "../controllers/responsibles/listResponsibles.controller";
import updateResponsibleController from "../controllers/responsibles/updateResponsible.controller";
import authAdm from "../middlewares/authAdm.middleware";
import authUser from "../middlewares/authToken.middleware";

const routes = Router()

export const responsibleRoutes = () => {
    routes.get("", authUser, listAResponsibleController)
    routes.get("/all", authUser, authAdm, listResponsiblesController)
    routes.post("", authUser, authAdm, createResponsibleController)
    routes.patch("", authUser, authAdm, updateResponsibleController)
    routes.delete("", authUser, authAdm, deleteResponsibleController)

    return routes
}


