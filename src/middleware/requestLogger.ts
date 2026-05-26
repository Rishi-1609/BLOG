import { pinoHttp } from "pino-http";
import logger from "../config/pinoLogger";

export const requestLogger = pinoHttp({
    logger,
});