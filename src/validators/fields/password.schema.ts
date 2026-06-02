import { z } from "zod";

export const registerPasswordSchema = z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(50, "Password cannot exceed 50 characters")
    .regex(/[A-Z]/, "Password must contain at least 1 uppercase character")
    .regex(/[a-z]/, "Password must contain at least 1 lowercase character")
    .regex(/[0-9]/, "Password must contain at least 1 digit")
    .regex(/[!@#$%^&*]/, "Password must contain at least 1 special character");

export const loginPasswordSchema = z
    .string()
    .min(1, "Password is required");
    