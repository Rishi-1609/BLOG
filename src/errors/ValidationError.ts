import AppError from "./AppError";

export class ValidationError extends AppError {

  public errors : unknown[]
  constructor(errors : unknown[]) {
    super("Validation Failed", 400);
    this.errors = errors;
  }
}

export class AuthorValidationError extends AppError {
  constructor(message : string) {
    super(message, 400);
  }
}

export default ValidationError;