import Blog, { IBlog } from "../models/Blog";

export const BlogRepository = {
    createBlog : async function(data : any) {
        const blog = await Blog.create({...data});
        return blog;
    },

    createMultipleBlogs : async function(data: any) {
        const blogs = await Blog.insertMany(data);
    },

    getBlogs : async function() {
        const blogs = await Blog.find()
            .populate('author', 'name email')
            .sort({ createdAt: -1 });
        return blogs;
    },

    getBlogById : async function (id : string) {
        const blog = await Blog.findById(id).populate("author", "name email");
        return blog;
    },

    saveBlog : async function (blog : IBlog) {
        await blog.save();
        return blog;
    },

    deleteBlog : async function (id : string, userId : string) {
        const deletedBlog = await Blog.findByIdAndDelete(id);
        return deletedBlog;
    }
}