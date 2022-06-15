drop DATABASE if EXISTS diving_db;

create DATABASE diving_db;

use DATABASE diving_db;

create domain UNSIGNED as Integer check (value > 0);

create Table certifications (
    id Serial PRIMARY key,
    name VARCHAR(30) not null,
    minimum_age INT,
    required_hours int
);

CREATE TABLE divers (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    is_instructor BOOLEAN DEFAULT FALSE NOT NULL,
    certification_id INTEGER REFERENCES certifications(id) ON DELETE
    SET
        NULL
);