export const patientQueries = (phone, email) => {
    if (email && !phone) {
        const patientQuery = `SELECT 
                                * 
                              FROM 
                                patient 
                              WHERE 
                                patient.email = '${email}'`

        return patientQuery
    }

    if (!email && phone) {
        const patientQuery = `SELECT 
                                * 
                              FROM 
                                patient 
                              WHERE 
                                patient.phone = '${phone}'`

        return patientQuery
    }
}

export const doctorQueries = (phone, email) => {
    if (email && !phone) {
        const doctorQuery = `SELECT 
                                * 
                             FROM 
                                doctor 
                             WHERE 
                                doctor.email = '${email}'`

        return doctorQuery
    }

    if (!email && phone) {
        const doctorQuery = `SELECT 
                                * 
                             FROM 
                                doctor 
                             WHERE 
                                doctor.phone = '${phone}'`

        return doctorQuery
    }
}

export const responsibleQueries = (phone, email) => {
    if (email && !phone) {
        const responsibleQuery = `SELECT 
                                    * 
                                  FROM 
                                    responsible 
                                  WHERE 
                                    responsible.email = '${email}'`
        return responsibleQuery
    }
    if (!email && phone) {
      console.log("query certa")
        const responsibleQuery = `SELECT 
                                    * 
                                  FROM 
                                    responsible 
                                  WHERE 
                                    responsible.phone = '${phone}'`

        return responsibleQuery
    }
}

export const administratorQueries = (email) => {
  if (email) {
      const administratorQuery = `SELECT 
                              * 
                            FROM 
                              administrator 
                            WHERE 
                              administrator.email = '${email}'`

      return administratorQuery
  }
}