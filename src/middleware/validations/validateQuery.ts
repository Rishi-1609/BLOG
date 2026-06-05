import { NextFunction, Request, Response } from "express"
import { querySchema } from "../../utils/BlogQueryDTO"
import ValidationError, { AuthorValidationError } from "../../errors/ValidationError";
import { AuthUser } from "../../services/AuthUser";

export function validateQuery() {
    return async (req : Request, res: Response, next : NextFunction) => {
        try {
            querySchema.parse(req.query);
            if (req.query.author) {
                const user_Id = await AuthUser.findUserId(req.query.author as string);
                if (!user_Id) 
                    throw new AuthorValidationError("Invalid Author ID");
            }
            next();
        } catch (error : any) {
            if (error instanceof AuthorValidationError) {
                next(error);
                return;
            }
            next(new ValidationError(
                    error.issues.map((issue: { path: any[]; message: any; }) => ({
                        field : issue.path.join("."),
                        message : issue.message,
                    })
                ))
            );
        }
    }
}