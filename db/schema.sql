drop DATABASE if EXISTS diving_db;

create DATABASE diving_db;

\c diving_db;

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

create domain LATLONG as POINT check (
    value [0] between -90
    and 90
) check (
    value [1] between -180
    and 180
);

CREATE TABLE locations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    coordinates LATLONG NOT NULL
);

CREATE TABLE tags (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    location_id INTEGER NOT NULL REFERENCES locations(id) ON DELETE CASCADE,
    UNIQUE(name, location_id)
);

CREATE TABLE dives (
    id SERIAL PRIMARY KEY,
    depth NUMERIC(5, 2) NOT NULL,
    dive_date TIMESTAMP NOT NULL DEFAULT NOW(),
    duration UNSIGNED NOT NULL,
    diver_id INTEGER NOT NULL REFERENCES divers(id) ON DELETE CASCADE,
    location_id INTEGER NOT NULL REFERENCES locations(id) ON DELETE CASCADE
);

CREATE INDEX diver_index ON dives (diver_id);

CREATE INDEX location_index ON dives (location_id);

create Function random_between(low int, high int) returns 
int as 
	$$ BEGIN RETURN floor(random() * (high - low + 1) + low);
end; 

$$ language plpgsql ;