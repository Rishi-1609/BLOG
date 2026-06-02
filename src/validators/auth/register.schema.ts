import {z} from "zod";
import { emailSchema } from "../fields/email.schema";
import { registerPasswordSchema } from "../fields/password.schema";
import { nameSchema } from "../fields/name.schema";

export const registerSchema = z
    .object({
        body : z.object({
            name : nameSchema,
            email : emailSchema,
            password : registerPasswordSchema,
        }),
    });

export type RegisterInput = z.infer<typeof registerSchema>;