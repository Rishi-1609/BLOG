import {z} from "zod";
import { emailSchema } from "../fields/email.schema";
import {loginPasswordSchema } from "../fields/password.schema";

export const loginSchema = z
    .object({
        body : z.object({
            email : emailSchema,
            password :loginPasswordSchema,
        }),
    })

export type LoginInput = z.infer<typeof loginSchema>;