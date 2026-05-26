import type { NextFunction, Response } from "express";
import Blog from "../models/Blog";
import type { AuthRequest } from "../middleware/auth";
import AuthorizationError from "../errors/AuthorizationError";
import NotFoundError from "../errors/NotFoundError";
import { createResponse, deleteResponse, successResponse } from "../utils/responseHandler";

export async function createBlog(req: AuthRequest, res: Response) : Promise<any> {
  
  const { title, content } = req.body as { title: string, content: string };
  
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : undefined;
  
  const blog = await Blog.create({
    title,
    content,
    imageUrl,
    author: req.userId,
  });
  
  createResponse(res, "Blog Created Successfully", {blog});
}

// List Blog
export async function listBlogs(req: AuthRequest, res: Response, next: NextFunction) : Promise<any> {
  
  const blogs = await Blog.find()
    .populate('author', 'name email')
    .sort({ createdAt: -1 });
  
  successResponse(res, "Blogs fetched successfully", {blogs});
}

// Get Blog by Id
export async function getBlog(req: AuthRequest, res: Response, next: NextFunction) : Promise<any> {
  
  const { id } = req.params as {id: string};
  const blog = await Blog.findById(id).populate("author", "name email");
  
  if (!blog) 
    throw new NotFoundError("Blog not found");
  
  successResponse(res, "Blog fetched successfully", {blog});
}

// Update Blog
export async function updateBlog(req: AuthRequest, res: Response, next: NextFunction) : Promise<any> {
  
  const { id } = req.params as { id: string };
  const blog = await Blog.findById(id);
  
  if (!blog) 
    throw new NotFoundError("Blog not found");
  
  if (blog.author.toString() !== req.userId)
    throw new AuthorizationError("Access Forbidden");
  
  const { title, content } = req.body as { title: string, content: string };
  
  if (typeof title === "string") 
    blog.title = title;
  
  if (typeof content == "string") 
    blog.content = content;
  
  if (req.file)
    blog.imageUrl = `/uploads/${req.file.filename}`;
  
  await blog.save();
  successResponse(res, "Blog updated successfully", {blog});
}

// Delete Blog
export async function deleteBlog(req: AuthRequest, res: Response, next: NextFunction) : Promise<any> {
  
  const { id } = req.params as { id: string };
  const blog = await Blog.findById(id);
  
  if (!blog) 
    throw new NotFoundError("Blog not found");
  
  if (blog.author.toString() !== req.userId)
    throw new AuthorizationError("Access Forbidden");
  
  const deletedBlog = await Blog.findByIdAndDelete(id);
  deleteResponse(res, "Blog deleted successfully");
}

