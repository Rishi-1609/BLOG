import ValidationError from "../errors/ValidationError";
import type { Request, Response, NextFunction } from "express";
import { isRequired } from "../validators/validation";
import { isValidEmail, isUniqueEmail } from "../validators/emailValidator";

export async function validateRegistrationEmail(req: Request, res: Response, next: NextFunction) {
    const email = req.body.email;
    try {
        const required = isRequired(email, "Email", "string");
        if (!required.valid) 
            throw new ValidationError(required.msg);

        const validEmail = isValidEmail(email);
        if (!validEmail.valid)
            throw new ValidationError(validEmail.msg);

        const uniqueEmail = await isUniqueEmail(email);
        if (!uniqueEmail.valid) 
            throw new ValidationError(uniqueEmail.msg);
        next();
    } catch (err) {
        next(err);
    }
}

export async function validateSignInEmail(req: Request, res: Response, next: NextFunction) {
    const email = req.body.email;
    try {
        const required = isRequired(email, "Email", "string");
        if (!required.valid) 
            throw new ValidationError(required.msg);

        const validEmail = isValidEmail(email);
        if (!validEmail.valid)
            throw new ValidationError(validEmail.msg);

        next();
    } catch (err) {
        next(err);
    }
}