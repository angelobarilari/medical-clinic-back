import { Router } from "express";
import createDoctorController from "../controllers/doctors/createDoctor.controller.js"

const routes = Router()

export const doctorRoutes = () => {
    routes.post("", createDoctorController)

    return routes
}

