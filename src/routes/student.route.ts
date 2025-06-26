import { Router } from "express";

import ValidationMiddleware from "../middlewares/validation.middleware";

import StudentController from "../controllers/student.controller";

import { studentCreationAttributes } from "../types/student.type";

const router = Router();

/**
 * @swagger
 * tags:
 *  name: Students
 *  description: Система управления студентами
 * components:
 *  responses:
 *   AllStudents:
 *    description: Массив пользователей.
 *    content:
 *     application/json:
 *      schema:
 *       type: array
 *       items:
 *        $ref: '#/components/schemas/Student'
 *   GetStudent:
 *    description: Студент с указанным ID
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/Student'
 *  schemas:
 *   Student:
 *    type: object
 *    properties:
 *     id:
 *      type: number
 *      description: ID студента
 *      example: 1
 *     first_name:
 *      type: string
 *      example: "Максим"
 *     surname:
 *      type: string
 *      example: "Кузов"
 *     student_group:
 *      type: string
 *      example: "М24-Ш04"
 *     email:
 *      type: string
 *      example: "aboba@aboba.ru"
 *     active:
 *      type: string
 *      enum: [активный, отчисленный]
 *      example: "активный"
 *   StudentCreate:
 *    type: object
 *    properties:
 *     first_name:
 *      type: string
 *      example: "Максим"
 *     surname:
 *      type: string
 *      example: "Кузов"
 *     student_group:
 *      type: string
 *      example: "М24-Ш04"
 *     email:
 *      type: string
 *      example: "aboba@aboba.ru"
 *     active:
 *      type: boolean
 *      example: true
 *      required: false
 */

/**
 * @swagger
 * /students/:
 *  get:
 *   tags: [Students]
 *   summary: Получение всех студентов
 *   description: Получение всех студентов
 *   responses:
 *    200:
 *     $ref: '#/components/responses/AllStudents'
 *    500:
 *     $ref: '#/components/responses/InternalServerError'
 */
router.get("/", StudentController.getAllStudents);

/**
 * @swagger
 * /students/active:
 *  get:
 *   tags: [Students]
 *   summary: Получение только активных студентов
 *   description: Получение только активных студентов
 *   responses:
 *    200:
 *     $ref: '#/components/responses/AllStudents'
 *    500:
 *     $ref: '#/components/responses/InternalServerError'
 */
router.get("/active", StudentController.getActiveStudents);

/**
 * @swagger
 * /students/{id}:
 *  get:
 *   tags: [Students]
 *   summary: Получение студента по ID
 *   description: Получение студента по ID
 *   parameters:
 *    - in: path
 *      required: true
 *      name: id
 *      schema:
 *       type: integer
 *       example: 1
 *      description: ID студента
 *   responses:
 *    200:
 *     $ref: '#/components/responses/GetStudent'
 *    500:
 *     $ref: '#/components/responses/InternalServerError'
 */
router.get("/:id", StudentController.getStudentById);

/**
 * @swagger
 * /students/:
 *  post:
 *   tags: [Students]
 *   summary: Создание студента
 *   description: Создание потока
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/StudentCreate'
 *   responses:
 *    200:
 *     $ref: '#/components/responses/GetStudent'
 *    400:
 *     $ref: '#/components/responses/BadRequestError'
 *    500:
 *     $ref: '#/components/responses/InternalServerError'
 */
router.post(
    "/",
    ValidationMiddleware.validateBody(studentCreationAttributes),
    StudentController.createStudent
);

/**
 * @swagger
 * /students/{id}:
 *  delete:
 *   tags: [Students]
 *   summary: Удаление студента
 *   description: Удаление студента
 *   parameters:
 *    - in: path
 *      required: true
 *      name: id
 *      schema:
 *       type: integer
 *       example: 1
 *      description: ID студента
 *   responses:
 *    200:
 *     description: Студент удален.
 *    400:
 *     $ref: '#/components/responses/BadRequestError'
 *    401:
 *     $ref: '#/components/responses/NoAccess'
 *    500:
 *     $ref: '#/components/responses/InternalServerError'
 */
router.delete("/:id", StudentController.deleteStudent);

export default router;
