import type { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User'
import AuthenticationError from '../errors/AuthenticationError';

// register a new user
export async function register(req: Request, res: Response, next: NextFunction) : Promise<any> {
  const { name, email, password } = req.body as {
    name: string,
    email: string,
    password: string
  }
  const salt = 10;
  const passwordHash = await bcrypt.hash(password, salt);
  const user = await User.create({ name, email, passwordHash });
  const token = jwt.sign(
    { userId: String(user._id) },
    process.env["JWT_SECRET"] as string,
    { expiresIn: '7d' }
  )
  return res.status(201).json({ token, user: { id: String(user._id), name, email } });
}

export async function login(req: Request, res: Response, next: NextFunction) : Promise<any> {
  const { email, password } = req.body as {
    email: string,
    password: string
  };
  const user = await User.findOne({ email });
  if (!user) {
    throw new AuthenticationError("Invalid Credentials");
  }
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) {
    throw new AuthenticationError("invalid Credentials");
  }
  const token = jwt.sign(
    { userId: String(user._id), name: user.name, email: user.email },
    process.env["JWT_SECRET"] as string,
    { expiresIn: "7d" }
  );
  return res.status(200).json({
    token,
    user: { id: String(user._id), name: user.name, email: user.email }
  });
}

export default { register, login };
