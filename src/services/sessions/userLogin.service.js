import { database } from "../../data-source.js"
import { AppError } from "../../errors/AppError.js"
import { patientQueries, doctorQueries, responsibleQueries, administratorQueries } from "./helpersQueries.js"
import { compare } from "bcrypt"
import jwt from "jsonwebtoken"
import "dotenv/config"

async function tokenSettings (userData, password) {
  const verifyPassword = await compare(password, userData.rows[0].password)

  if (!verifyPassword) throw new AppError(401, {
    error: "error",
    message: "Invalid credentials"
  })
  
    const token = jwt.sign({
      name: userData.rows[0].name,
      rg: userData.rows[0].rg,
      crm: userData.rows[0].crm,
      isAdm: userData.rows[0].isadm
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "24h",
      subject: userData.rows[0].id
    })
    return token
}

const userLoginService = async (phone, email, password) => {
    if (!password) throw new AppError(400, {
        error: "error",
        message: "You must enter with password"
    })
    
    const patient = await database.query(patientQueries(phone, email), [])
    if (patient.rowCount > 0) return tokenSettings(patient, password)
    
    const responsible = await database.query(responsibleQueries(phone, email), [])
    if (responsible.rowCount > 0) return tokenSettings(responsible, password)
    
    const doctor = await database.query(doctorQueries(phone, email), [])
    if (doctor.rowCount > 0) return tokenSettings(doctor, password)

    const administrator = await database.query(administratorQueries(email), [])
    if (administrator.rowCount > 0) return tokenSettings(administrator, password)

    throw new AppError(404, {
      error: "error",
      message:"User not found"
    })
}

export default userLoginService

