import { Router } from "express";

import createResponsibleController from "../controllers/responsibles/createResponsible.controller";
import deleteResponsibleController from "../controllers/responsibles/deleteResponsible.controller";
import listAResponsibleController from "../controllers/responsibles/listAResponsible.controllers";
import listResponsiblesController from "../controllers/responsibles/listResponsibles.controller";
import updateResponsibleController from "../controllers/responsibles/updateResponsible.controller";

const routes = Router()

export const responsibleRoutes = () => {
    routes.get("", listAResponsibleController)
    routes.get("/all", listResponsiblesController)
    routes.post("", createResponsibleController)
    routes.patch("", updateResponsibleController)
    routes.delete("", deleteResponsibleController)

    return routes
}


