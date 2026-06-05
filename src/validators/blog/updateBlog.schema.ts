import z from "zod";
import { titleSchema } from "../fields/title.schema";
import { contentSchema } from "../fields/content.schema";

export const updateBlogSchema = z
    .object({
            title : titleSchema, 
            content : contentSchema,
    })

export type UpdateBlogInput = z.infer<typeof updateBlogSchema>;

export const WrapperUpdateBlogSchema = z.object({
    body : updateBlogSchema,
});