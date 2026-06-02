import z from "zod";
import { titleSchema } from "../fields/title.schema";
import { contentSchema } from "../fields/content.schema";
import { imageUrlSchema } from "../fields/image.schema";
import { objectIdSchema } from "../fields/objectId.schema";

export const createBlogSchema = z
    .object({
        title : titleSchema,
        content : contentSchema,
        imageUrl : imageUrlSchema,
        authorId : objectIdSchema.optional(),
    })

export type CreateBLogInput = z.infer<typeof createBlogSchema>;