import { Router } from "express";
import { createBlog, listBlogs, getBlog, updateBlog, deleteBlog } from "../controllers/blogControllers";
import { requireAuth } from "../middleware/auth";
import upload from "../utils/uploader";

const router: Router = Router();

/**
 * @openapi
 * /api/blogs:
 *  post:
 *      summary: Create a blog (auth required)
 *      tags: [Blogs]
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          required: true
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      type: object
 *                      required: [title, content]
 *                      properties:
 *                          title:
 *                              type: string
 *                          content:
 *                              type: string
 *                          image:
 *                              type: string
 *                              format: binary
 *      responses:
 *          201: 
 *              description: Created
 *          401: 
 *              description: Unauthorized
 */
router.post("/", requireAuth, upload.single("image"), createBlog);

/**
 * @openapi
 * /api/blogs:
 *  get:
 *      summary: List blogs
 *      tags: [Blogs]
 *      responses:
 *          200: 
 *              description: OK
 */
router.get("/", listBlogs);

/**
 * @openapi
 * /api/blogs/{id}:
 *  get:
 *      summary: Get a blog by ID
 *      tags: [Blogs]
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *              type: string
 *      responses:
 *          200: 
 *              description: OK
 *          404: 
 *              description: Not Found
 */
router.get("/:id", getBlog);

/**
 * @openapi
 * /api/blogs/{id}:
 *  put:
 *      summary: Update a blog (auth required)
 *      tags: [Blogs]
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *              type: string
 *      requestBody:
 *          required: false
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      type: object
 *                      required: [title, content]
 *                      properties:
 *                          title:
 *                              type: string
 *                          content:
 *                              type: string
 *                          image:
 *                              type: string
 *                              format: binary
 *      responses:
 *          200: 
 *              description: OK
 *          401: 
 *              description: Unauthorized
 *          403:
 *              description: Access Forbidden
 */
router.put("/:id", requireAuth, upload.single("image"), updateBlog);

/** 
 * @openapi
 * /api/blogs/{id}:
 *  delete:
 *      summary: Delete a blog by ID (Auth required)
 *      tags: [Blogs]
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *              type: string
 *      responses:
 *          204: 
 *              description: Dleted
 *          403: 
 *              description: Access Forbidden
 *          404: 
 *              description: Not Found
 *          500:
 *              description: Internal Server Error
 */
router.delete("/:id", requireAuth, deleteBlog);

export default router;
