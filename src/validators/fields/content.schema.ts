import z from "zod";

export const contentSchema = z
    .string()
    .trim()
    .min(10, "Content must be at least 10 characters long");