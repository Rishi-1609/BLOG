import { isRequired } from "../validators/validation";
import ValidationError from "../errors/ValidationError";
import type { Request, Response, NextFunction } from "express";
import { hasAllFields, isPasswordValidLength } from "../validators/passwordValidator";

export function validatePassword(req: Request, res: Response, next: NextFunction) {
    const password = req.body.password;
    try{
        const required = isRequired(password, "Password", "string");
        if (!required.valid) 
            throw new ValidationError(required.msg);

        const validLength = isPasswordValidLength(password);
        if (!validLength.valid) 
            throw new ValidationError(validLength.msg);

        const validPassword = hasAllFields(password);
        if (!validPassword.valid) 
            throw new ValidationError(validPassword.msg);

        next();
    } catch (err) {
        next(err);
    }
}

export function validateSignInPassword(req: Request, res: Response, next: NextFunction) {
    const password = req.body.password;
    try{
        const required = isRequired(password, "Password", "string");
        if (!required.valid) 
            throw new ValidationError(required.msg);

        next();
    } catch (err) {
        next(err);
    }
}