import { isRequired } from "../validators/validation";
import { isNameValid, isNameValidLength } from "../validators/nameValidator";
import ValidationError from "../errors/ValidationError";
import type { Request, Response, NextFunction } from "express";

export function validateRegistrationName(req: Request, res: Response, next: NextFunction) {
  const name = req.body.name;
  try {
    const required = isRequired(name, "Name", "string");
    if (!required.valid)
      throw new ValidationError(required.msg);

    const validName = isNameValid(name);
    if (!validName.valid)
      throw new ValidationError(validName.msg);

    const validLength = isNameValidLength(name);
    if (!validLength.valid)
      throw new ValidationError(validLength.msg);

    next();
  } catch (err) {
    next(err);
  }
}