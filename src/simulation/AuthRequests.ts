import { UserLoginRequest, UserRegistrationRequest } from "../config/userRequestInterface";
import { simulationResponse } from "./simulationResponseInterface";

export async function registerUser(url : string, data : UserRegistrationRequest) : Promise<simulationResponse>{
    const start = performance.now();
    try {
        const response = await fetch(`${url}`, {
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
            },
            body : JSON.stringify(data),
        }); 
        const responseData = await response.json();
        return {
            success : response.ok,
            status : response.status,
            responseData,
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

export async function loginUser(url : string, data : UserLoginRequest) : Promise<simulationResponse>{
    const start = performance.now();
    try {
        const response = await fetch(`${url}`, {
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
            },
            body : JSON.stringify(data),
        }); 
        const responseData = await response.json();
        return {
            success : response.ok,
            status : response.status,
            responseData,
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