import { SortOrder } from "mongoose";
import Blog, { IBlog } from "../models/Blog";
import { BlogQueryOptions } from "../utils/BlogQueryDTO";
import { BlogCreateDTO } from "../config/dto/BlogCreateDTO";

export const BlogRepository = {
    createBlog : async function(data : BlogCreateDTO) {
        console.log(data);
        const blog = await Blog.create({...data});
        return blog;
    },

    createMultipleBlogs : async function(data: BlogCreateDTO[]) {
        const blogs = await Blog.insertMany(data);
        return blogs;
    },

    getBlogs : async function(queryParams : BlogQueryOptions) {
        const {page, limit, sortBy, sortOrder, author} = queryParams;
        const selection = (author) ? {author : author} : {};
        const blogs = await Blog.find(selection)
            .skip((page-1)*limit)
            .limit(limit)
            .populate('author', 'name email')
            .sort({ [sortBy]: sortOrder as SortOrder });
        const total = await Blog.countDocuments(selection);
        return {
            blogs, 
            pagination : {total, page, limit, pages : Math.ceil(total/limit)}
        };
    },

    getBlogById : async function (id : string) {
        const blog = await Blog.findById(id).populate("author", "name email");
        return blog;
    },

    saveBlog : async function (blog : IBlog) {
        await blog.save();
        return blog;
    },

    deleteBlog : async function (blog_Id : string) {
        const deletedBlog = await Blog.findByIdAndDelete(blog_Id);
        return deletedBlog;
    }
}