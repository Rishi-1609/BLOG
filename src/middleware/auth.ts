import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import AuthenticationError from '../errors/AuthenticationError';
import { env } from '../config/env';

export interface AuthRequest extends Request {
  user_Id? : string,
}

export function requireAuth(req: AuthRequest, res: Response, next: NextFunction) : any {
  const header = req.headers["authorization"];
  if (!header || !header.startsWith("Bearer")) 
    throw new AuthenticationError("User not Authenticated");
  
  const token = header.slice('Bearer'.length).trim();
  
  const secret = env.JWT_SECRET;
  
  if (!secret) 
    throw new Error("Internal Server Error");
  const payload = jwt.verify(token, secret) as { user_Id: string };
  
  req.user_Id = payload.user_Id;
  console.log(payload.user_Id);
  next();
  return;
}

export default requireAuth;
