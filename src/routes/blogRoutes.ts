import { Router } from "express";
import { createBlog, listBlogs, getBlog, updateBlog, deleteBlog } from "../controllers/blogControllers";
import { requireAuth } from "../middleware/auth";
import upload from "../utils/uploader";
import { asyncHandler } from "../utils/asyncHandler";
import { WrapperUpdateBlogSchema } from "../validators/blog/updateBlog.schema";
import { validate } from "../middleware/validate.middleware";
import { WrapperCreateBlogSchema } from "../validators/blog/createBlog.schema";
import rateLimit from "express-rate-limit";
import { validateQuery } from "../middleware/validations/validateQuery";
import { WrapperBlogIdSchema } from "../validators/blog/blogId.schema";

const router: Router = Router();

const limiter = rateLimit({
    windowMs : 15*60*1000,
    limit : 100,
    standardHeaders : 'draft-8',
    legacyHeaders : false,
    message : "Too many requests. Try again later",
});

router.use(limiter);

/**
 * @openapi
 * /api/v1/blogs:
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
router.post("/", asyncHandler(requireAuth), upload.single("image"), validate(WrapperCreateBlogSchema), asyncHandler(createBlog));

/**
 * @openapi
 * /api/v1/blogs:
 *  get:
 *      summary: List blogs
 *      tags: [Blogs]
 *      responses:
 *          200: 
 *              description: OK
 */
router.get("/", validateQuery(), asyncHandler(listBlogs));

/**
 * @openapi
 * /api/v1/blogs/{id}:
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
router.get("/:id", validate(WrapperBlogIdSchema), asyncHandler(getBlog));

/**
 * @openapi
 * /api/v1/blogs/{id}:
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
router.put("/:id", asyncHandler(requireAuth), upload.single("image"), validate(WrapperUpdateBlogSchema), asyncHandler(updateBlog));

/** 
 * @openapi
 * /api/v1/blogs/{id}:
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
router.delete("/:id", asyncHandler(requireAuth), validate(WrapperBlogIdSchema), asyncHandler(deleteBlog));

export default router;
