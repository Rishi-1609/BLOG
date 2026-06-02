import z from "zod";

export const titleSchema = z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters long")
    .max(150, "Title cannot exceed 150 characters");