import { NextFunction, Response, Request } from "express";
import { Sequelize } from "sequelize";
import { TransactionalRequest } from "../types/express.type";

class TransactionMiddleware {
    initTransaction(sequelize: Sequelize) {
        return async (req: TransactionalRequest, res: Response, next: NextFunction) => {
            const transaction = await sequelize.transaction();

            req.transaction = transaction;

            await next();
        };
    }

    async commitTransaction(req: TransactionalRequest, res: Response, next: NextFunction) {
        res.on("finish", async () => {
            const transaction = req.transaction;

            if (transaction && res.statusCode >= 200 && res.statusCode < 300) {
                await transaction.commit();
            } else if (transaction) {
                await transaction.rollback();
            }
        });

        next();
    }
}

export default new TransactionMiddleware();
