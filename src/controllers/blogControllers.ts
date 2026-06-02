import type { NextFunction, Response } from "express";
import { AuthRequest } from "../middleware/auth";
import { createResponse, deleteResponse, successResponse } from "../utils/responseHandler";
import { BlogServices } from "../services/BlogServices";

export async function createBlog(req: AuthRequest, res: Response) : Promise<any> {
  
  const { title, content } = req.body as { title: string, content: string };
  
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : undefined;
  
  const blogData = {
    title,
    content,
    imageUrl,
    author: req.userId,
  };

  const blog = await BlogServices.blogCreation(blogData);
  
  createResponse(res, "Blog Created Successfully", {blog});
}

// List Blog
export async function listBlogs(req: AuthRequest, res: Response, next: NextFunction) : Promise<any> {
  
  const blogs = await BlogServices.fetchBlogs();
  
  successResponse(res, "Blogs fetched successfully", {blogs});
}

// Get Blog by Id
export async function getBlog(req: AuthRequest, res: Response, next: NextFunction) : Promise<any> {
  
  const { id } = req.params as {id: string};
  const blog = await BlogServices.fetchBlogById({id});
  
  successResponse(res, "Blog fetched successfully", {blog});
}

// Update Blog
export async function updateBlog(req: AuthRequest, res: Response, next: NextFunction) : Promise<any> {
  
  const { id } = req.params as { id: string };
  const { title, content } = req.body as { title: string, content: string };
  let imageUrl;
  if (req.file)
    imageUrl = `/uploads/${req.file.filename}`;
  const updateData = {
    blog_Id : id,
    user_Id : req.userId!,
    title, 
    content,
    imageUrl,
    fileName : req.file?.filename,
  };
  const blog = await BlogServices.updateBlogById(updateData);
  successResponse(res, "Blog updated successfully", {blog});
}

// Delete Blog
export async function deleteBlog(req: AuthRequest, res: Response, next: NextFunction) : Promise<any> {
  
  const { id : blog_Id } = req.params as { id: string };
  const user_Id  = req.userId;
  const deleteData = {blog_Id, user_Id};  
  const deletedBlog = await BlogServices.deleteBlogById(deleteData);
  deleteResponse(res, "Blog deleted successfully");
}

