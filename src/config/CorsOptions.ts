import { CorsOptions } from "cors";
import { env } from "./env";

export const corsOptions : CorsOptions = {
    origin : env.CLIENT_URL,
    optionsSuccessStatus : 200
};