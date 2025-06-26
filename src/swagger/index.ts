import path from "path";
import { fileURLToPath } from "url";
import swaggerJSDoc from "swagger-jsdoc";
import fs from "fs";

const _dirname = path.dirname(fileURLToPath(import.meta.url));

const options: swaggerJSDoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "IOT API",
            description: "API для системы управления студентами",
            version: "1.0.0",
        },
        },
        servers: [
            {
                description: "Сервер разработки",
                url: `http://${process.env.BACK_HOST ?? "localhost"}:${
                    process.env.BACK_PORT ?? 5000
                }/api`,
            },
        ],
    apis: "routes/*.route.ts middlewares/*.middleware.ts routes/*.route.js middlewares/*.middleware.js".split(" ").map((value) => path.join(_dirname, `../${value}`)),
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;

const outputPath = path.join(_dirname, "swagger.json");

fs.writeFileSync(outputPath, JSON.stringify(swaggerSpec, null, 2));
