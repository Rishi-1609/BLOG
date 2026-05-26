import { isRequired } from "../validators/validation";
import ValidationError from "../errors/ValidationError";
import type { Request, Response, NextFunction } from "express";
import { hasAllFields, isPasswordValidLength } from "../validators/passwordValidator";

export function validatePassword(req: Request, res: Response, next: NextFunction) : any {
    const password = req.body.password;
    const required = isRequired(password, "Password", "string");
    
    if (!required.success) 
        throw new ValidationError(required.message);
    
    const validLength = isPasswordValidLength(password);
    
    if (!validLength.success) 
        throw new ValidationError(validLength.message);
    
    const validPassword = hasAllFields(password);
    
    if (!validPassword.success) 
        throw new ValidationError(validPassword.message);
    
    next();
    return;
}

export function validateSignInPassword(req: Request, res: Response, next: NextFunction) : any {
    const password = req.body.password;
    const required = isRequired(password, "Password", "string");
    
    if (!required.success) 
        throw new ValidationError(required.message);
    
    next();
    return;
}