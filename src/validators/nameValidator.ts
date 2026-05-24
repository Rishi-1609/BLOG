import { ValidationResult } from "./validation";

export function isNameValid(name: string): ValidationResult {
  const nameRegex = /^[A-Za-z\s]+$/;

  if (!nameRegex.test(name))
    return { valid: false, msg: "Invalid Name structure" };

  return { valid: true, msg: "Valid Name" };
}

export function isNameValidLength(name: string): ValidationResult {
  const minLength = 3;
  const maxLength = 30;

  if (name.length < minLength)
    return { valid: false, msg: `Name length less than minimum length(${minLength})` };

  if (name.length > maxLength)
    return { valid: false, msg: `Name length more than maximum length(${maxLength})` };

  return { valid: true, msg: "Name length is valid" };
}