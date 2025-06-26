import { Router } from "express";

import studentRouter from "./routes/student.route";

const router = Router();

router.use("/students", studentRouter);

export default router;
