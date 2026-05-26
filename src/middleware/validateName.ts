import { isRequired } from "../validators/validation";
import { isNameValid, isNameValidLength } from "../validators/nameValidator";
import ValidationError from "../errors/ValidationError";
import type { Request, Response, NextFunction } from "express";

export function validateRegistrationName(req: Request, res: Response, next: NextFunction) : any {
  const name = req.body.name;
  const required = isRequired(name, "Name", "string");
  
  if (!required.success)
    throw new ValidationError(required.message);
  
  const validName = isNameValid(name);
  
  if (!validName.success)
    throw new ValidationError(validName.message);
  
  const validLength = isNameValidLength(name);
  
  if (!validLength.success)
    throw new ValidationError(validLength.message);
  
  next();
}