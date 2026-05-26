import { NextFunction, Request, Response } from "express";
import { isRequired } from "../validators/validation";
import ValidationError from "../errors/ValidationError";

export function validateBlog(req: Request, res: Response, next: NextFunction) : any {
    const {title, content} = req.body as {title: any, content: any};

    const titleRequired = isRequired(title, "title", "string");
    const contentRequired = isRequired(content, "content", "string");

    if (!titleRequired.success) 
        throw new ValidationError("Title cannot be empty");
        
    if (!contentRequired.success) 
        throw new ValidationError("Content cannot be empty");
    
    next();
    return;
}