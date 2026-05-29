import { SeedUser } from "../seedTestingData/seedDatabase";
import { env } from "../config/env";
import { loginUser, registerUser } from "./AuthRequests";
import { UserSession } from "./UserSession";
import { createBlog, fetchBlog, fetchBlogLists } from "./BlogRequests";
import { simulationResponse } from "./simulationResponseInterface";

const url = `http://127.0.0.1:${env.PORT}`;
const apiUser = `${url}/api/auth`;
const apiBlog = `${url}/api/blogs`;

// Login API call
export async function login(user : SeedUser) : Promise<simulationResponse>{
    const credentials = {email : user.email, password : user.password};
    const response = await loginUser(`${apiUser}/login/`, credentials);
    return response;
}

// Register API call
export async function register(user : SeedUser) {
    const credentials = {name : user.name, email : user.email, password : user.password};
    const response = await registerUser(`${apiUser}/register/`, credentials);
    const responseSuccess = response;
    return responseSuccess;
}

export async function simulateAuthenticateUserSession(users : SeedUser[]) {
    const AuthenticatedSessions  = await Promise.all(
        users.map(async (user) => {
            const token = await login(user);
            return {
                userId : String(user._id),
                email : user.email,
                token : token.responseData.data.token,
                responseBody : token,
            }
        })
    );
    return AuthenticatedSessions;
}

export async function fetchBlogs(blogId? : string) {
    let response;
    if (!blogId) {
        response = await fetchBlogLists(`${apiBlog}`);
    } else {
        response = await fetchBlog(apiBlog, blogId);
    }
    return response;
}

export async function multipleUsersFetchBlogs(count : number) {
    let arr = [];
    for (let i = 0; i < count; ++i){
        arr.push(fetchBlogs);
    }
    const fetchBlogsResponses = await Promise.all (
        arr.map(async (fn) => {
            const success = await fn();
            return success;
        })
    );
    return fetchBlogsResponses;
}

export async function fetchBlogById(blogId : string, count? : number) {
    let arr = [];
    arr.push(fetchBlogs);
    for (let i = 1; count && i < count; ++i){
        arr.push(fetchBlogs);
    }
    const fetchBlogResponses = await Promise.all (
        arr.map(async (fn) => {
            const success = await fn(blogId);
            return success;
        })
    );
    return fetchBlogResponses;
}

export async function BlogCreation(user : UserSession) {
    let token;
    token = (Math.random() > 0.7) ? user.token : '';
    const response = await createBlog(`${apiBlog}`, token);
    return response.success;
}

export async function simulateMultipleBlogCreation(users : UserSession[]) {
    let arr = [];
    for (const user of users) {
        arr.push({
            fn : BlogCreation,
            user : user,
        });
    }
    const createBlogResponses = await Promise.all(
        arr.map(async (args) => {
            const success = await args.fn(args.user);
            return success;
        })
    )
    return createBlogResponses;
}