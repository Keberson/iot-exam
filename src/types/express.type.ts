import { Request } from "express";
import { Transaction } from "sequelize";

export interface TransactionalRequest extends Request {
    transaction?: Transaction;
}
