CREATE TABLE IF NOT EXISTS students (
    id serial PRIMARY KEY,
    first_name varchar(255) NOT NULL,
    surname varchar(255) NOT NULL,
    student_group varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    active boolean NOT NULL
);
