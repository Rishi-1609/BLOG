import type { NextFunction, Request, Response } from 'express';
import { createResponse, successResponse } from '../utils/responseHandler';
import { AuthUser } from '../services/AuthUser';
import ConflictError from '../errors/ConflictError';

// register a new user
export async function register(req: Request, res: Response, next: NextFunction) : Promise<any> {
  const { name, email, password } = req.body as {
    name: string,
    email: string,
    password: string
  }

  const existingEmail = await AuthUser.findEmail(req.body.email);
  if (existingEmail)
    throw new ConflictError("Email already registered");

  const {user, token} = await AuthUser.register({name, email, password});

  createResponse(res, "User registered successfully", { token, user: { id: String(user._id), name, email } });
}

export async function login(req: Request, res: Response, next: NextFunction) : Promise<any> {
  const { email, password } = req.body as {
    email: string,
    password: string
  };

  const {user, token} = await AuthUser.login({email, password});

  successResponse(res, "Log In successfull", {token, user: { id: String(user._id), name: user.name, email: user.email }});
}

export default { register, login };
