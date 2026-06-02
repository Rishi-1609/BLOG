import z from "zod";
import { titleSchema } from "../fields/title.schema";
import { contentSchema } from "../fields/content.schema";
import { objectIdSchema } from "../fields/objectId.schema";
import { imageUrlSchema } from "../fields/image.schema";

export const updateBlogSchema = z
    .object({
            blog_Id : objectIdSchema,
            user_Id : objectIdSchema,
            title : titleSchema, 
            content : contentSchema,
            imageUrl : imageUrlSchema.optional(),
            fileName : z.string().optional(),
    })

export type UpdateBlogInput = z.infer<typeof updateBlogSchema>;