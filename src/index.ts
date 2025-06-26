import express from "express";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import cors from "cors";
import "express-async-errors";

import { sequelize } from "./database/database";

import ErrorMiddleware from "./middlewares/error.middleware";
import TransactionMiddleware from "./middlewares/transaction.middleware";

import swaggerSpec from "./swagger";

import router from "./router";
import LoggingMiddleware from "./middlewares/logging.middleware";

const app = express();
const PORT = process.env.BACK_PORT ?? 5000;

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(LoggingMiddleware.logging);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(
    "/api",
    TransactionMiddleware.initTransaction(sequelize),
    TransactionMiddleware.commitTransaction,
    router
);

app.use(ErrorMiddleware.handleErrors);

app.listen(PORT, async () => {
    try {
        await sequelize.sync({ logging: false });
        console.log(`Server is running on http://localhost:${PORT}`);
    } catch (err) {
        console.error("Error in Sync with DB");
        throw Error("No sync with DB");
    }
});
