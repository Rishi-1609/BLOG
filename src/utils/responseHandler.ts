import { Response } from "express";

interface ApiResponse<T> {
    success: boolean,
    message: string,
    data?: T,
}

export function validResponse<T>(res: Response, statusCode: number = 200, message: string, data?: T) : void {
    const responseBody : ApiResponse<T> = {
        success: true,
        message: message,
    }

    if (data !== undefined) {
        responseBody.data = data;
    }

    res.status(statusCode).json(responseBody);
    return;
}

export function successResponse<T>(res: Response, message: string, data?: T) : void {
    validResponse(res, 200, message, data);
}

export function createResponse<T>(res: Response, message: string, data?: T) : void {
    validResponse(res, 201, message, data);
}

export function deleteResponse<T>(res: Response, message: string) : void {
    validResponse(res, 204, message, undefined);
}