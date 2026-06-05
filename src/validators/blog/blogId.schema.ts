import z from "zod";
import { objectIdSchema } from "../fields/objectId.schema";

export const blogIdSchema = z
    .object({
        id : objectIdSchema,
    })

export type BlogIdInput = z.infer<typeof blogIdSchema>;

export const WrapperBlogIdSchema = z.object({
    params : blogIdSchema,
});