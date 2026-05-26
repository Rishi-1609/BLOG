import { ValidationResult } from "./validation";

export function isNameValid(name: string): ValidationResult {
  const nameRegex = /^[A-Za-z\s]+$/;

  if (!nameRegex.test(name))
    return { success: false, message: "Invalid Name structure" };

  return { success: true, message: "success Name" };
}

export function isNameValidLength(name: string): ValidationResult {
  const minLength = 3;
  const maxLength = 30;

  if (name.length < minLength)
    return { success: false, message: `Name length less than minimum length(${minLength})` };

  if (name.length > maxLength)
    return { success: false, message: `Name length more than maximum length(${maxLength})` };

  return { success: true, message: "Name length is success" };
}