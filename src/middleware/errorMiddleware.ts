import type { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import AppError from "../errors/AppError";
import { logger } from "../config/pinoLogger";
import ValidationError from "../errors/ValidationError";

export const errorHandler : ErrorRequestHandler = (err, req, res, next) => {
    
    logger.error({
        error : err,
        route : req.originalUrl,
        method: req.method,
        message : err.message,
        stack : err.stack
    }, "Request Failed");
    
    if (err instanceof ValidationError) {
        res.status(err.statusCode).json({
            success: false,
            message: err.message,
            errors : err.errors,
        });
        return;
    }
    if (err instanceof AppError) {
        res.status(err.statusCode).json({
            success: false,
            message: (err.message),
        });
        return;
    }
    
    res.status(500).json({
        success: false,
        message: "Internal Server Error",
    });
    return;
}