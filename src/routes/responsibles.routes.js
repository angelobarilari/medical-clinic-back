import { Router } from "express";

import updateResponsibleController from "../controllers/responsibles/updateResponsible.controller";
import createResponsibleController from "../controllers/responsibles/createResponsible.controller";
import deleteResponsibleController from "../controllers/responsibles/deleteResponsible.controller";
import listResponsibleController from "../controllers/responsibles/listResponsibles.controller";
import listaAResponsibleController from "../controllers/responsibles/listAResponsible.controllers";

const routes = Router()

export const responsibleRoutes = () => {
    routes.get("", listResponsibleController)
    routes.get("/all", listaAResponsibleController)
    routes.post("", createResponsibleController)
    routes.patch("", updateResponsibleController)
    routes.delete("/:id", deleteResponsibleController)

    return routes
}


