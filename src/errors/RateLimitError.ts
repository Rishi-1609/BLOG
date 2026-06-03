import { RateLimitExceededEventHandler } from "express-rate-limit";
import AppError from "./AppError";
import { NextFunction, Request, Response } from "express";

export class RateLimitError extends AppError {

    constructor(message : string) {
        super(message, 429);
    }

}

export const rateLimitErrorFunction : RateLimitExceededEventHandler = () => {
        throw new RateLimitError("Request limit reached. Try again some time later");
    }