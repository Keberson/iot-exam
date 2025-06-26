import { Request, Response } from "express";

import { StudentCreationAttributes } from "../models/student.model";

import { TransactionalRequest } from "../types/express.type";

import StudentService from "../services/student.service";

class StudentController {
    async getAllStudents(_: Request, res: Response) {
        const streams = await StudentService.getStudents();

        res.status(200).json(streams);
    }

    async getActiveStudents(_: Request, res: Response) {
        const streams = await StudentService.getStudents(true);

        res.status(200).json(streams);
    }

    async getStudentById(req: Request, res: Response) {
        const studentId = parseInt(req.params.id);
        const student = await StudentService.getStudentById(studentId);

        res.status(200).json(student);
    }

    async createStudent(req: TransactionalRequest, res: Response) {
        const transaction = req.transaction;
        const payload: StudentCreationAttributes = req.body;
        const student = await StudentService.createStudent(payload, transaction);

        res.status(200).json(student);
    }

    async deleteStudent(req: TransactionalRequest, res: Response) {
        const transaction = req.transaction;
        const studentId = parseInt(req.params.id);

        await StudentService.deleteStudent(studentId, transaction);

        res.status(200).json({});
    }
}

export default new StudentController();
