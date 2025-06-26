import { NextFunction, Request, Response } from "express";
import chalk from "chalk";

class LoggingMiddleware {
    logging(req: Request, res: Response, next: NextFunction) {
        console.log(
            chalk.green(
                `[${new Date().toLocaleString("ru")}] ${req.method} to ${
                    req.url
                } with body: ${JSON.stringify(req.body)}`
            )
        );

        res.on("finish", () => {
            console.log(
                chalk.blue(`[${new Date().toLocaleString("ru")}] Status: ${res.statusCode}`)
            );
        });

        next();
    }
}

export default new LoggingMiddleware();
