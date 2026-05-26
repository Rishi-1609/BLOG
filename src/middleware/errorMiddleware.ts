import type { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import AppError from "../errors/AppError";
import { logger } from "../config/pinoLogger";

export const errorHandler : ErrorRequestHandler = (err, req, res, next) => {
    
    logger.error({
        error : err,
        route : req.originalUrl,
        method: req.method,
    }, "Request Failed");
    
    if (err instanceof AppError) {
        res.status(err.statusCode).json({
            success: false,
            message: err.message,
        });
        return;
    }
    
    res.status(500).json({
        success: false,
        message: "Internal Server Error",
    });
    return;
}