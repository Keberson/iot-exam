import { NextFunction, Response } from "express";
import chalk from "chalk";

import { TransactionalRequest } from "../types/express.type";

class ErrorMiddleware {
    /**
     * @swagger
     * components:
     *  responses:
     *   InternalServerError:
     *    description: Возникли неполадки на сервере
     *    content:
     *     application/json:
     *      schema:
     *       type: object
     *       properties:
     *        message:
     *         type: string
     *         description: Сообщение об ошибке
     *         default: "Проблемы на сервере"
     */
    async handleErrors(err: Error, req: TransactionalRequest, res: Response, next: NextFunction) {
        console.error(chalk.red(err.name, err.message, err.cause));

        if (typeof err.cause === "number") {
            res.status(err.cause).json({ message: err.message });
        } else {
            res.status(500).json({ message: "Проблемы на сервере" });
        }
    }
}

export default new ErrorMiddleware();
