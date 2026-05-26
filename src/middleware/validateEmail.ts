import ValidationError from "../errors/ValidationError";
import type { Request, Response, NextFunction } from "express";
import { isRequired } from "../validators/validation";
import { isValidEmail, isUniqueEmail } from "../validators/emailValidator";

export async function validateRegistrationEmail(req: Request, res: Response, next: NextFunction) : Promise<any>{
    const email = req.body.email;
    const required = isRequired(email, "Email", "string");
    
    if (!required.success) 
        throw new ValidationError(required.message);
    
    const validEmail = isValidEmail(email);
    
    if (!validEmail.success)
        throw new ValidationError(validEmail.message);
    
    const uniqueEmail = await isUniqueEmail(email);
    
    if (!uniqueEmail.success) 
        throw new ValidationError(uniqueEmail.message);
    
    next();
    return;
}

export function validateSignInEmail(req: Request, res: Response, next: NextFunction) : any {
    const email = req.body.email;
    const required = isRequired(email, "Email", "string");
    
    if (!required.success) 
        throw new ValidationError(required.message);
    
    const validEmail = isValidEmail(email);
    
    if (!validEmail.success)
        throw new ValidationError(validEmail.message);
    
    next();
    return;
}