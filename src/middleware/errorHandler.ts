import type { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import AppError from "../errors/AppError";

export const errorHandler : ErrorRequestHandler = (err, req, res, next) => {
    if (err instanceof AppError) {
        res.status(err.statusCode).json({
            success: false,
            message: err.message,
        });
        return;
    }

    console.error(err);
    
    res.status(500).json({
        success: false,
        message: "Internal Server Error",
    });
    return;
}