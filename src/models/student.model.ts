import { DataTypes, ModelDefined, Optional, Sequelize } from "sequelize";

export type StudentAttributes = {
    id: number;
    first_name: string;
    surname: string;
    student_group: string;
    email: string;
    active: boolean;
};

export type StudentCreationAttributes = Optional<StudentAttributes, "id" | "active">;

export const StudentInit = (
    sequelize: Sequelize
): ModelDefined<StudentAttributes, StudentCreationAttributes> =>
    sequelize.define(
        "Student",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            first_name: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            surname: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            student_group: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            active: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true,
            },
        },
        {
            tableName: "students",
            timestamps: false,
        }
    );
