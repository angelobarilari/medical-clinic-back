CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE administrativo(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(14) NOT NULL,
    name VARCHAR(200) NOT NULL,
    PASSWORD VARCHAR NOT NULL
);

CREATE TABLE medico(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    CRM INTEGER NOT NULL,
    phone VARCHAR(14) NOT NULL,
    email VARCHAR(100) NOT NULL,
    especialidade VARCHAR(200) NOT NULL,
    PASSWORD VARCHAR NOT NULL
);

CREATE TABLE responsavel(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    RG INTEGER,
    phone VARCHAR(14),
    email VARCHAR(100),
    PASSWORD VARCHAR,
    responsavel_id uuid,
);

CREATE TABLE paciente(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    RG INTEGER,
    phone VARCHAR(14),
    email VARCHAR(100),
    PASSWORD VARCHAR,
    responsavel_id uuid,
    FOREIGN KEY (responsavel_id) REFERENCES responsavel(id)
);

