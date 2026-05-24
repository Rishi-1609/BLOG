import User from "../models/User";
import { ValidationResult } from "./validation";

export function isValidEmail(email: string): ValidationResult {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) 
        return {valid: false, msg: "Email is invalid"}
    return {valid: true, msg: "Email is valid"};
}

export async function isUniqueEmail(email: string) : Promise<ValidationResult> {
    const existingEmail = await User.findOne({email});
    if (existingEmail) 
        return {valid: false, msg: "Email already registerd"};
    return {valid: true, msg: "Email is Unique"};
}