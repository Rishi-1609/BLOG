import { BlogUpdateRequest } from "../config/blogRequestInterface";
import AuthorizationError from "../errors/AuthorizationError";
import { NotFoundError } from "../errors/NotFoundError";
import { BlogRepository } from "../repositories/BlogRepository"
import { BlogIdInput } from "../validators/blog/blogId.schema";
import { CreateBLogInput } from "../validators/blog/createBlog.schema";
import { DeleteBlogInput } from "../validators/blog/deleteBlog.schema";
import { UpdateBlogInput } from "../validators/blog/updateBlog.schema";

export const BlogServices = {

    blogCreation : async function (data : CreateBLogInput) {
        const blog = await BlogRepository.createBlog(data);
        return blog;
    },

    fetchBlogs : async function () {
        const blogs = await BlogRepository.getBlogs();
        return blogs;
    },

    fetchBlogById : async function (blogIdRequest : BlogIdInput) {
        const blog = await BlogRepository.getBlogById(blogIdRequest.id);
        if (!blog) 
            throw new NotFoundError("Blog not found");
        return blog;
    },

    updateBlogById : async function (data : UpdateBlogInput) {
        const blog = await BlogRepository.getBlogById(data.blog_Id);
        if (!blog) 
            throw new NotFoundError("Blog not found");
        if (blog.author.toString() !== data.user_Id)
            throw new AuthorizationError("Access Forbidden");
        blog.title = data.title;
        blog.content = data.content;
        if (data.imageUrl) {
            blog.imageUrl = `/uploads/${data.fileName}`;
        }
        await BlogRepository.saveBlog(blog);
        return blog;
    },

    deleteBlogById : async function (data : DeleteBlogInput) {
        const blog = await BlogRepository.getBlogById(data.blog_Id);
        if (!blog) 
            throw new NotFoundError("Blog not found");
        if (blog.author.toString() !== data.user_Id)
            throw new AuthorizationError("Access Forbidden");
        const deletedBlog = await BlogRepository.deleteBlog(data.blog_Id, data.user_Id)
        return deletedBlog;
    }

}