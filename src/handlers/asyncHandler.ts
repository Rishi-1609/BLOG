import { Request, Response, NextFunction } from "express";


export function asyncHandler(fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) {

    return async function(req: Request, res: Response, next: NextFunction) {
        return Promise.resolve(fn(req, res, next)).catch((err) => next(err));
    };
}