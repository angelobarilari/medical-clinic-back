CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE administrator;
DROP TABLE doctor;
DROP TABLE responsible;
DROP TABLE patient;
DROP TABLE consultation;

INSERT INTO 
	administrator(email, phone, name, password)
    VALUES
    ('adm@adm.com', '01234567890123', 'nome', '123456');


CREATE TABLE administrator(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(14) NOT NULL,
    name VARCHAR(200) NOT NULL,
    isAdm BOOLEAN DEFAULT TRUE,
    password VARCHAR NOT NULL
);

CREATE TABLE doctor(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(200) NOT NULL,
    crm VARCHAR UNIQUE NOT NULL,
    phone VARCHAR(14) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    specialization VARCHAR(200) NOT NULL,
    isAvailable BOOLEAN TRUE,
    password VARCHAR NOT NULL
);

CREATE TABLE responsible(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(200) NOT NULL,
    rg VARCHAR(10) UNIQUE,
    phone VARCHAR(14),
    email VARCHAR(100) UNIQUE,
    password VARCHAR
);

CREATE TABLE patient(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(200) NOT NULL,
    rg VARCHAR(10) UNIQUE,
    phone VARCHAR(14),
    email VARCHAR(100) UNIQUE,
    password VARCHAR,
    responsible_id uuid,
    FOREIGN KEY (responsible_id) REFERENCES responsible(id)
);

CREATE TABLE appointment(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    doctor_crm VARCHAR(200) NOT NULL,
    patient_name VARCHAR(200) NOT NULL,
  	patient_id uuid NOT NULL,
    patient_rg VARCHAR(10),
    isCancelled BOOLEAN DEFAULT FALSE,
    date DATE NOT NULL,
    hour TIME NOT NULL,
    FOREIGN KEY (doctor_crm) REFERENCES doctor(crm),
    FOREIGN KEY (patient_rg) REFERENCES patient(rg),
    FOREIGN KEY (patient_id) REFERENCES patient(id)
);


