import { NextFunction, Request, Response } from "express";
import { z } from "../utils/zodTranslated";

import { zodErrorsToHumanReadable } from "../utils/zodErrors";

class ValidationMiddleware {
    /**
     * @swagger
     * components:
     *  responses:
     *   BadRequestError:
     *    description: Переданные данные не соответствуют требуемым типам или недостаточно полей в объекте
     *    content:
     *     application/json:
     *      schema:
     *       type: object
     *       properties:
     *        message:
     *         type: string
     *         description: Сообщение об ошибке
     *         example: "Некорректные данные"
     */
    validateBody<T>(expectedTypes: z.ZodType<T>) {
        return (req: Request, _: Response, next: NextFunction) => {
            const parseResult = expectedTypes.safeParse(req.body);

            if (!parseResult.success) {
                const errors = zodErrorsToHumanReadable(parseResult.error.errors);

                console.error(errors);

                throw new Error(`Некорректные данные: ${errors}`, {
                    cause: 400,
                });
            }

            next();
        };
    }
}

export default new ValidationMiddleware();
