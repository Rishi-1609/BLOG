import z from "zod";
import { titleSchema } from "../fields/title.schema";
import { contentSchema } from "../fields/content.schema";
export const createBlogSchema = z
    .object({
        title : titleSchema,
        content : contentSchema,
    })

export type CreateBLogInput = z.infer<typeof createBlogSchema>;

export const WrapperCreateBlogSchema = z.object({
    body : createBlogSchema,
})