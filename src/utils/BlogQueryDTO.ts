import z from "zod";
import { authorIdSchema, objectIdSchema } from "../validators/fields/objectId.schema";

const allowedSortBy = ["createdAt", "updatedAt", "title"] as const;
const allowedSortOrder =["asc", "desc", "1", "-1"] as const;

export const querySchema = z.object({
    page : z.coerce.number().min(1).default(1),
    limit : z.coerce.number().min(1).max(20).default(10),
    sortBy : z.enum(allowedSortBy).default("createdAt"),
    sortOrder : z.enum(allowedSortOrder).default("desc"),
    author : authorIdSchema.optional()
  });

export type BlogQueryOptions = z.infer<typeof querySchema>;

export const listBlogsSchema = z.object({
    query : querySchema,
})