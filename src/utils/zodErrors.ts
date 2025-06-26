import type { ZodIssue } from "zod";

export const zodErrorsToHumanReadable = (issues: ZodIssue[]) => {
    const issuesMap = issues.map((issue) => {
        return `[${issue.path.join("/")}] ${issue.message}`;
    });

    return issuesMap.join(", ");
};
