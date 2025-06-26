import { Sequelize } from "sequelize";

import { StudentInit } from "../models/student.model";

const sequelize = new Sequelize({
    dialect: "postgres",
    database: process.env.PG_DB ?? "iot",
    username: process.env.PG_USER ?? "postgres",
    password: process.env.PG_PASSWORD ?? "postgres",
    host: process.env.PG_HOST ?? "localhost",
    port: Number(process.env.PG_PORT) || 5432,
    logging: console.log,
});

const Student = StudentInit(sequelize);

export { sequelize, Student };
