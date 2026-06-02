import {z} from "zod";

export const emailSchema = z
    .email({message : "Invalid Email"})
    .pipe(
        z.string()
        .trim()
        .min(1, {message : "Email field is required"})
        .toLowerCase()
);