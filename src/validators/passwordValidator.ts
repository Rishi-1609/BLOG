import { isRequired, ValidationResult } from "./validation";

export function isPasswordValidLength(password: string): ValidationResult {
  const minLength = 8;

  if (password.length < minLength)
    return { valid: false, msg: `Password length less than minimum length(${minLength})` };

  return { valid: true, msg: "Password length is valid" };
}

export function hasAllFields(password: any): ValidationResult {
    const uppercaseRegex = /^(?=.*[A-Z])/;
    const lowercaseRegex = /^(?=.*[a-z])/;
    const digitRegex = /^(?=.*\d)/;
    const symbolsRegex = /^(?=.*[!@#$%^&*])/;
    if (!uppercaseRegex.test(password)) 
        return {valid: false, msg: `Password does not have UpperCase`};

    if (!lowercaseRegex.test(password))
        return {valid: false, msg: `Password does not have LowerCase`};

    if (!digitRegex.test(password))
        return {valid: false, msg: `Password does not have Digit`};

    if (!symbolsRegex.test(password))
        return {valid: false, msg: `Password does not have Symbol`};
    
    return {valid: true, msg: "Password has atleast 1 Uppercase letter, 1 Lowercase letter, 1 Digit, 1 Symbol"};
}