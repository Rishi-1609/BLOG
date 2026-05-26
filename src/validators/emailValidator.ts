import UserRepository from "../repositories/UserRepository";
import { ValidationResult } from "./validation";

export function isValidEmail(email: string): ValidationResult {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) 
        return {success: false, message: "Email is invalid"}
    return {success: true, message: "Email is success"};
}

export async function isUniqueEmail(email: string) : Promise<ValidationResult> {
    const existingEmail = await UserRepository.findUserByEmail(email);
    if (existingEmail) 
        return {success: false, message: "Email already registerd"};
    return {success: true, message: "Email is Unique"};
}