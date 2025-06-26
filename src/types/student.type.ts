import { z } from "../utils/zodTranslated";

export type StudentStatus = "активный" | "отчисленный";

export const studentCreationAttributes = z.object({
    first_name: z.string(),
    surname: z.string(),
    student_group: z.string(),
    email: z.string().email(),
    active: z.boolean().optional(),
});
