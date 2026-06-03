import "dotenv/config";
import fs from "fs/promises";
import { SeedUser } from "../seedTestingData/seedDatabase";
import { fetchBlogById, multipleUsersFetchBlogs, simulateAuthenticateUserSession } from "./Scenarios";
import path from "path";
import { calculateMetrics } from "./calculateMetrics";
import { ScenarioMetrics } from "./ScenarioMetrics";

export function printMetrics (data : any) {
    console.log(data);
}

export async function getUsers() {
    try {
        const file = path.join(__dirname, 'users.json');
        const users = await fs.readFile(file, 'utf-8');
        return JSON.parse(users) as SeedUser[];
    } catch (error) {
        throw error;
    }
}

export async function analyzeAuthAPI(fn : any, data : SeedUser[]) {
    const scenarioStart = performance.now();
    const responses = await fn(data);
    const scenarioDuration = performance.now() - scenarioStart;
    const simulationResponses = responses.map((response: { responseBody: any; }) => response.responseBody);
    const metrics = calculateMetrics(simulationResponses, scenarioDuration);
    printMetrics(metrics);
    return responses;
}

export async function analyzeFetchAllBlogsAPI(fn : any, count : number) {
    const scenarioStart = performance.now();
    const responses = await fn(count);
    const scenarioDuration = performance.now() - scenarioStart;
    const simulationResponses = responses//.map((response: { responseBody: any; }) => response.responseBody);
    const metrics = calculateMetrics(simulationResponses, scenarioDuration);
    printMetrics(metrics);
    return responses;
}

export async function runSimulation() {
    const users = await getUsers();
    const authenticatedSessions = await analyzeAuthAPI(simulateAuthenticateUserSession, users.slice(0,11));
    //const fetchBlogsResponses = (await analyzeFetchAllBlogsAPI(multipleUsersFetchBlogs, 50))[0];
    //const blogId = fetchBlogsResponses.responseData.data.blogs[0]._id;
    //console.log(blogId);
    //const fetchSingleBlogResponses = await fetchBlogById(blogId, 0.6*users.length);
}

runSimulation();