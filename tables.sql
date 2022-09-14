CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE administrator;
DROP TABLE doctor;
DROP TABLE responsible;
DROP TABLE patient;
DROP TABLE consultation;

CREATE TABLE administrator(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(14) NOT NULL,
    name VARCHAR(200) NOT NULL,
    PASSWORD VARCHAR NOT NULL
);

CREATE TABLE doctor(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(200) NOT NULL,
    crm VARCHAR UNIQUE NOT NULL,
    phone VARCHAR(14) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    especialidade VARCHAR(200) NOT NULL,
    isAvailable BOOLEAN,
    PASSWORD VARCHAR NOT NULL
);

CREATE TABLE responsible(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(200) NOT NULL,
    rg VARCHAR(10) UNIQUE,
    phone VARCHAR(14),
    email VARCHAR(100) UNIQUE,
    PASSWORD VARCHAR
);

CREATE TABLE patient(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(200) NOT NULL,
    rg VARCHAR(10) UNIQUE,
    phone VARCHAR(14),
    email VARCHAR(100) UNIQUE,
    PASSWORD VARCHAR,
    responsible_id uuid,
    FOREIGN KEY (responsible_id) REFERENCES responsible(id)
);

CREATE TABLE consultation(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    doctor_crm VARCHAR(200) NOT NULL,
    doctor_id uuid UNIQUE NOT NULL,
    patient_name VARCHAR(200) NOT NULL,
  	patient_id uuid UNIQUE NOT NULL,
    patient_rg VARCHAR(10) UNIQUE,
    date DATE,
    hour TIME,
    FOREIGN KEY (doctor_crm) REFERENCES doctor(crm),
    FOREIGN KEY (doctor_id) REFERENCES doctor(id),
    FOREIGN KEY (patient_rg) REFERENCES patient(rg),
    FOREIGN KEY (patient_id) REFERENCES patient(id)
);

