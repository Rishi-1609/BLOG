import { Router } from 'express';
import { register, login } from '../controllers/authControllers';
import { asyncHandler } from '../utils/asyncHandler';
import { validate } from '../middleware/validate.middleware';
import { registerSchema } from '../validators/auth/register.schema';
import { loginSchema } from '../validators/auth/login.schema';
import rateLimit from 'express-rate-limit';
import { rateLimitErrorFunction } from '../errors/RateLimitError';
import { success } from 'zod';

const router : Router = Router();

const limiter = rateLimit({
    windowMs : 15*60*1000,
    limit : 10,
    standardHeaders : 'draft-8',
    legacyHeaders : false,
    message : {
        success : false,
        statusCode : 429,
        message : "Too many requests. Try again later",
    },
});

router.use(limiter);

/**
 * @openapi
 *
 * /api/auth/register:
 *   post:
 *      summary: Register a new user
 *      tags: [Auth]
 *      requestBody: 
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                    type: object
 *                    required: [name, email, password]
 *                    properties: 
 *                      name: 
 *                        type: string
 *                      email:
 *                        type: string
 *                      password: 
 *                        type: string
 *      responses: 
 *        201: 
 *          description: Created
 *        400: 
 *          description: Missing Fields
 *        409:
 *          description: Email Already Registered
* */
router.post("/register", validate(registerSchema), asyncHandler(register));

/**
 * @openapi
 *
 * /api/auth/login:
 *   post:
 *      summary: User Login
 *      tags: [Auth]
 *      requestBody: 
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                    type: object
 *                    required: [email, password]
 *                    properties: 
 *                      email:
 *                        type: string
 *                      password: 
 *                        type: string
 *      responses: 
 *        200: 
 *          description: User Logged In
 *        401: 
 *          description: Invalid Credentials
* */
router.post("/login", validate(loginSchema), asyncHandler(login));

export default router;
