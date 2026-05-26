import AppError from "./AppError";

export class MongoError extends AppError {
    constructor(message: string) {
        super(message, 500);
    }
}