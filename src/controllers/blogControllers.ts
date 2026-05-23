import type { Response } from "express";
import Blog from "../models/Blog";
import type { AuthRequest } from "../middleware/auth";

export async function createBlog(req: AuthRequest, res: Response) {
  try {
    const { title, content } = req.body as { title: string, content: string };
    if (!title || !content) return res.status(400).json({ message: "Missing fields" });
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : undefined;
    const blog = await Blog.create({
      title,
      content,
      imageUrl,
      author: req.userId,
    });

    return res.status(200).json({ blog });

  } catch (error) {
    return res.status(500).json({ message: "Failed to create blog" });
  }
}

// List Blog
export async function listBlogs(req: AuthRequest, res: Response) {
  try {
    const blogs = await Blog.find()
      .populate('author', 'name email')
      .sort({ createdAt: -1 });
    return res.json(blogs);
  } catch (error) {
    return res.status(500).json({ message: "Failed to list blogs" });
  }
}

// Get Blog by Id
export async function getBlog(req: AuthRequest, res: Response) {
  try {
    const { id } = req.params as (id: string);
    const blog = await Blog.findById(id).populate("author", "name email");
    if (!blog) return res.status(404).json({ message: "Not Found" });
    return res.json(blog);
  } catch (error) {
    return res.status(500).json({ message: "Failed to get blog" });
  }
}

// Update Blog
export async function updateBlog(req: AuthRequest, res: Response) {
  try {
    const { id } = req.params as { id: string };
    const blog = await Blog.findById(id);
    if (!blog) return res.status(404).json({ message: "Not Found" });

    if (blog.author.toString() !== req.userId)
      return res.status(403).json({ message: "Access Forbidden" });

    const { title, content } = req.body as { title: string, content: string };
    if (typeof title === "string") blog.title = title;
    if (typeof content == "string") bog.content = content;

    if (req.file) {
      blog.imageUrl = `/uploads/${req.file.filename}`;
    }

    await blog.save();
    return res.json({ blog });
  } catch (error) {
    return res.status(500).json({ message: "Failed to update blog" });
  }
}

// Delete Blog
export async function deleteBlog(req: AuthRequest, res: Response) {
  try {
    const { id } = req.params as { id: string };
    const blog = await Blog.findById(id);
    if (!blog) return res.status(404).json({ message: "Not Found" });

    if (blog.author.toString() !== req.userId)
      return res.status(403).json({ message: "Access Forbidden" });

    const deletedBlog = await Blog.findByIdAndDelete(id);
    return res.status(204).json({ message: `Blog deleted of User_ID: ${id}` });
  } catch (error) {
    return res.status(500).json(message: "Failed to delete blog");
  }
}

