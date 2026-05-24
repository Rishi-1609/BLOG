import { Router } from 'express';
import { register, login } from '../controllers/authControllers';

const router : Router = Router();

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
router.post("/register", register);

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
router.post("/login", login);

export default router;
