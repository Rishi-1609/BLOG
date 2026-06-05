import z from "zod";
import { objectIdSchema } from "../fields/objectId.schema";

export const deleteBlogSchema = z
    .object({
        blog_Id : objectIdSchema,
    });

export type DeleteBlogInput = z.infer<typeof deleteBlogSchema>;