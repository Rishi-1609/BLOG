import { createRandomBlog } from "../seedTestingData/seedDatabase";
import { simulationResponse } from "./simulationResponseInterface";

export async function fetchBlogLists(url : string) : Promise<simulationResponse>{
    const start = performance.now();
    try {
        const response = await fetch(`${url}`); 
        const data = await response.json();
        return {
            success : response.ok,
            status : response.status,
            responseData : data,
            durationMs : performance.now() - start,
        };
    } catch (error) {
        return {
            success : false,
            status : 0,
            durationMs : performance.now() - start,
            error : String(error),
        };
    }
}

export async function fetchBlog (url : string, id : string) : Promise<simulationResponse>{
    const start = performance.now();
    try {
        const response = await fetch(`${url}/${id}`); 
        const data = await response.json();
        return {
                success : response.ok,
                status : response.status,
                responseData : data,
                durationMs : performance.now() - start,
        };
    } catch (error) {
        return {
            success : false,
            status : 0,
            durationMs : performance.now() - start,
            error : String(error),
        };
    }
}

export async function createBlog (url : string, token? : string) : Promise<simulationResponse>{
    const start = performance.now();
    try {
        const blogData = createRandomBlog();
        const response = await fetch(`${url}`, {
            method : "POST",
            headers : {
                "Authorization" : `Bearer ${token}`,
                "Content-Type" : "application/json",
            },
            body : JSON.stringify(blogData),
        }); 
        const data = await response.json();
        return {
            success : response.ok,
            status : response.status,
            responseData : data,
            durationMs : performance.now() - start,
        };
    } catch (error) {
        return {
            success : false,
            status : 0,
            durationMs : performance.now() - start,
            error : String(error),
        };
    }
}

export async function updateBlog(url : string, id : string, token? : string) : Promise<simulationResponse>{
    const start = performance.now();
    try {    
        const updatedData = createRandomBlog();
        const response = await fetch(`${url}/${id}`, {
            method : "PUT",
            headers : {
                "Authorization" : `Bearer ${token}`,
                "Content-Type" : "application/json",
            },
            body : JSON.stringify(updatedData),
        }); 
        const data = await response.json();
        return {
            success : response.ok,
            status : response.status,
            responseData : data,
            durationMs : performance.now() - start,
        };
    } catch (error) {
        return {
            success : false,
            status : 0,
            durationMs : performance.now() - start,
            error : String(error),
        };
    }
}

export async function deleteBlog(url : string, id : string, token? : string) : Promise<simulationResponse>{
    const start = performance.now();
    try {    
        const response = await fetch(`${url}/${id}`, {
            method : "DELETE",
            headers : {
                "Authorization" : `Bearer ${token}`,
                "Content-Type" : "application/json",
            },
        }); 
        const data = await response.json();
        return {
            success : response.ok,
            status : response.status,
            responseData : data,
            durationMs : performance.now() - start,
        };
    } catch (error) {
        return {
            success : false,
            status : 0,
            durationMs : performance.now() - start,
            error : String(error),
        };
    }
}