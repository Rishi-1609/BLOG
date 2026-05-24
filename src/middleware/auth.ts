import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  userId?: string,
}

export function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const header = req.headers["authorization"];
    if (!header || !header.startsWith("Bearer")) {
      res.status(401).json({ message: "Unauthorized User" });
      return;
    }
    console.log("Checked for empty headers");
    const token = header.slice('Bearer'.length).trim();
    console.log("Sliced the header");
    const secret = process.env.JWT_SECRET;
    console.log("Secret retrieved from env");
    if (!secret) {
      res.status(500).json({message: "Internal Server Error"});
      return;
    }
    const payload = jwt.verify(token, secret) as { userId: string };
    console.log("JWT verified");
    req.userId = payload.userId;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Invalid token" });
    return;
  }
}

export default requireAuth;
