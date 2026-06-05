import { BlogCreateDTO } from "../config/dto/BlogCreateDTO";
import { BlogDeleteDTO } from "../config/dto/BlogDeleteDTO";
import { BlogIdDTO } from "../config/dto/BlogIdDTO";
import { BlogUpdateDTO } from "../config/dto/BlogUpdateDTO";
import AuthorizationError from "../errors/AuthorizationError";
import { NotFoundError } from "../errors/NotFoundError";
import { BlogRepository } from "../repositories/BlogRepository"
import { BlogQueryOptions } from "../utils/BlogQueryDTO";

export const BlogServices = {

    blogCreation : async function (data : BlogCreateDTO) {
        console.log(data);
        const blog = await BlogRepository.createBlog(data);
        return blog;
    },

    fetchBlogs : async function (queryParams : BlogQueryOptions) {
        const blogs = await BlogRepository.getBlogs(queryParams);
        return blogs;
    },

    fetchBlogById : async function (blogIdRequest : BlogIdDTO) {
        const blog = await BlogRepository.getBlogById(blogIdRequest.blog_Id);
        if (!blog) 
            throw new NotFoundError("Blog not found");
        return blog;
    },

    updateBlogById : async function (data : BlogUpdateDTO) {
        const blog = await BlogRepository.getBlogById(data.blog_Id);
        if (!blog) 
            throw new NotFoundError("Blog not found");

        console.log(blog.author._id.toString());
        console.log(data.user_Id);

        if (blog.author._id.toString() !== data.user_Id)
            throw new AuthorizationError("Access Forbidden");
        blog.title = data.title;
        blog.content = data.content;
        if (data.imageUrl) {
            blog.imageUrl = `/uploads/${data.fileName}`;
        }
        await BlogRepository.saveBlog(blog);
        return blog;
    },

    deleteBlogById : async function (data : BlogDeleteDTO) {
        const blog = await BlogRepository.getBlogById(data.blog_Id);
        if (!blog) 
            throw new NotFoundError("Blog not found");
        if (blog.author._id.toString() !== data.user_Id)
            throw new AuthorizationError("Access Forbidden");
        const deletedBlog = await BlogRepository.deleteBlog(data.blog_Id)
        return deletedBlog;
    }

}