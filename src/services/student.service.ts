import { Transaction, WhereOptions } from "sequelize";
import { Student } from "../database/database";

import { StudentAttributes, StudentCreationAttributes } from "../models/student.model";

class StudentService {
    private prepareStudent(student: StudentAttributes) {
        return {
            ...student,
            active: student.active ? "активный" : "отчисленный",
        };
    }

    async getStudentModel(id: number) {
        const student = await Student.findByPk(id);

        if (!student) {
            throw new Error("Некорректный ID студента", { cause: 400 });
        }

        return student;
    }

    async getStudents(active?: boolean) {
        const whereFilter: WhereOptions<StudentAttributes> | undefined = active
            ? {
                  active: true,
              }
            : undefined;
        const students = await Student.findAll({
            order: [["id", "ASC"]],
            where: whereFilter,
        });

        return students.map((student) => this.prepareStudent(student.dataValues));
    }

    async getStudentById(id: number) {
        const student = (await this.getStudentModel(id)).dataValues;

        return this.prepareStudent(student);
    }

    async createStudent(
        payload: StudentCreationAttributes,
        transaction: Transaction | undefined = undefined
    ) {
        const student = (await Student.create(payload, { transaction })).dataValues;

        return this.prepareStudent(student);
    }

    async deleteStudent(id: number, transaction: Transaction | undefined = undefined) {
        const student = await this.getStudentModel(id);

        student.destroy({ transaction });
    }
}

export default new StudentService();
