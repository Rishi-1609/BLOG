import type { Request, Response, NextFunction } from "express";
import ValidationError from "../errors/ValidationError";

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
}