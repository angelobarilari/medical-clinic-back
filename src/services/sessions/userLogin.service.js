import { database } from "../../data-source"
import { AppError } from "../../errors/AppError"
import { patientQueries, doctorQueries, responsibleQueries, administratorQueries } from "./helpersQueries"
import jwt from "jsonwebtoken"

const userLoginService = async (phone, email, password) => {
    if (!password) throw new AppError(400, {
        error: "error",
        message: "You must enter with password"
    })
    
    const patient = await database.query(patientQueries(phone, email), [])
    if (patient.rowCount > 0) {
      const token = jwt.sign({
        name: patient.rows[0].name,
        rg: patient.rows[0].rg
      },
      "SECRET_KEY",
      {
        expiresIn: "24h",
        subject: patient.rows[0].id
      })
      return token
    }
        
    const doctor = await database.query(doctorQueries(phone, email), [])
    if (doctor.rowCount > 0) {
      const token = jwt.sign({
        crm: doctor.rows[0].crm,
      },
      "SECRET_KEY",
      {
        expiresIn: "24h",
        subject: doctor.rows[0].id
      })
      return token
    }

    const responsible = await database.query(responsibleQueries(phone, email), [])
    if (responsible.rowCount > 0) {
      const token = jwt.sign({
        name: responsible.rows[0].name,
        rg: responsible.rows[0].rg,
      },
      "SECRET_KEY",
      {
        expiresIn: "24h",
        subject: responsible.rows[0].id
      })
      return token
    }

    const administrator = await database.query(administratorQueries(email), [])
    if (administrator.rowCount > 0) {
      const token = jwt.sign({
        isAdm: administrator.rows[0].isAdm
      },
      "SECRET_KEY",
      {
        expiresIn: "24h",
        subject: administrator.rows[0].id
      })
      return token
    }

    throw new AppError(404, {
      error: "error",
      message: "Invalid credentials"
    })
}

export default userLoginService

