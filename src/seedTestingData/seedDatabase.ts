import 'dotenv/config'
;import {faker} from "@faker-js/faker";
import bcrypt from "bcrypt";
import UserRepository from "../repositories/UserRepository";
import { BlogRepository } from "../repositories/BlogRepository";
import mongoose from "mongoose";
import User from "../models/User";
import { Blog } from "../models/Blog";
import { connectDB, disconnectDB } from "../config/database";
import fs from "fs";

export interface SeedUser {
    _id : mongoose.Types.ObjectId,
    name : string,
    email : string,
    password : string,
}

export interface SeedBlog {
    title : string,
    content : string,
    imageUrl? : string,
    author? : string,
}

const userCount = 150;
const blogCountForEachUser = 50;

export function createRandomUser() : SeedUser{
    const _id = new mongoose.Types.ObjectId(); 
    const name = faker.person.fullName();
    const email = faker.internet.email();
    const password = faker.internet.password({
        length : 12,
        memorable : false,
        pattern : /[A-Za-z0-9!@#$%^&*]/,
    });
    return {
        _id,
        name,
        email,
        password,
    }
}

export function createRandomBlog() : SeedBlog {
    return {
        title : faker.lorem.sentence({min : 4, max : 8}),
        content : faker.lorem.paragraphs(5, '\n\n'),
    }
}

export function generateRandomUsers(count: number) : SeedUser[] {
    const users = faker.helpers.multiple(createRandomUser, {count});
    return users;
}

export function generateRandomBlogs(count: number) : SeedBlog[] {
    const blogs = faker.helpers.multiple(createRandomBlog, {count});
    return blogs;
}

async function saveUsersJson(users : SeedUser[]) {
    await fs.promises.writeFile("users.json", JSON.stringify(users, null, 2));
}

export async function insertMultipleSeedUsers(users : SeedUser[]) {
    await Promise.all(
        users.map (user => insertSingleSeedUser(user))
    );
}

export async function insertSingleSeedUser(user : SeedUser){
    const passwordHash = await bcrypt.hash(user.password, 10);
    const created = await UserRepository.createUser({
        _id : user._id,
        name : user.name,
        email : user.email,
        passwordHash : passwordHash,
    });
    return created;
}

export async function insertSeedBlogs(users : SeedUser[]) {
    for (const user of users) {
        const blogs = generateRandomBlogs(blogCountForEachUser);
        for (const blog of blogs) {
            blog.author = String(user._id);
        }
        await insertManySeedBLogs(blogs);
    }
}

export async function insertManySeedBLogs(blogs : SeedBlog[]) {
    await BlogRepository.createMultipleBlogs(blogs);
}

export async function clearDatabase() {
    try {
        await Promise.all([
          User.deleteMany({}),
          Blog.deleteMany({})
        ]);
    } catch (error) {
        console.error("Error Clearing Database: ", error);
    }
}

export async function seedDatabase() {
    const users = generateRandomUsers(userCount);
    try {
        await connectDB();
        //await clearDatabase();
        await insertMultipleSeedUsers(users);
        await saveUsersJson(users);
        //await insertSeedBlogs(users);
        console.log("Database seeded");
    } catch (error) {
        console.error("Error while seeding databse: ", error);
        throw error;
    } finally {
        await disconnectDB();
    }
}