import z from "zod";

export const imageSchema = z
    .object({
        mimetype : z
            .enum([
                "image/jpeg",
                "image/jpg",
                "image/png",
                "image/webp",
            ]),
            size : z
                .number()
                .max(5*1024*1024),
    })
    .optional();

export const imageUrlSchema = z
    .string()
    .optional();