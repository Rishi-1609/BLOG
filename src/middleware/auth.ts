import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import AuthenticationError from '../errors/AuthenticationError';

export interface AuthRequest extends Request {
  userId?: string,
}

export function requireAuth(req: AuthRequest, res: Response, next: NextFunction) : any {
  const header = req.headers["authorization"];
  if (!header || !header.startsWith("Bearer")) 
    throw new AuthenticationError("User not Authenticated");
  
  const token = header.slice('Bearer'.length).trim();
  
  const secret = process.env.JWT_SECRET;
  
  if (!secret) 
    throw new Error("Internal Server Error");
  const payload = jwt.verify(token, secret) as { userId: string };
  
  req.userId = payload.userId;
  next();
  return;
}

export default requireAuth;
