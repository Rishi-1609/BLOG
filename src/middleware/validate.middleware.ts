import { NextFunction, Request, Response } from "express";
import { ZodTypeAny, ZodError } from "zod";
import ValidationError from "../errors/ValidationError";

export const validate = (schema : ZodTypeAny) => {
    return (req: Request, res : Response, next : NextFunction) => {
        try {
            schema.parse({
                body : req.body,
                params : req.params,
                query : req.query,
            });

            next();        
        } catch (error) {
            if (error instanceof ZodError) {
                throw new ValidationError(
                    JSON.stringify(
                        error.issues.map(issue => ({
                            field : issue.path.join("."),
                            message : issue.message,
                        }))
                    )
                );
            }
        }
    }
}