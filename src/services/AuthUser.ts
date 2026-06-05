import bcrypt from "bcrypt";
import UserRepository from "../repositories/UserRepository";
import { UserRegistrationRequest, UserLoginRequest, UserDatabaseDetails } from "../config/userRequestInterface";
import AuthenticationError from "../errors/AuthenticationError";
import { jwtSign } from "./jwtSignature";

const salt = 10;

export const AuthUser = {

    register : async function (data : UserRegistrationRequest) {
        const {password, ...userDetails} = data;
        const passwordHash = await bcrypt.hash(password, salt);
        const hashedData = {...userDetails, passwordHash};
        const user = await UserRepository.createUser(hashedData);
        const userData : UserDatabaseDetails = {
            user_Id : String(user._id),
            name : user.name,
            email : user.email,
        }

        const token = jwtSign(userData);
        return {user, token};
    },

    login : async function (data : UserLoginRequest) {
        const user = await UserRepository.findUserByEmail(data.email);
        
        if (!user) 
            throw new AuthenticationError("Invalid Credentials");

        const ok = await bcrypt.compare(data.password, user.passwordHash);

        if (!ok) 
            throw new AuthenticationError("Invalid Credentials");

        const userData : UserDatabaseDetails = {
            user_Id : String(user._id),
            name : user.name,
            email : user.email,
        }

        const token = jwtSign(userData);

        return {user, token};
    },

    findEmail : async function(email : string) {
        const emailFound = await UserRepository.findUserByEmail(email);
        return emailFound;
    },

    findUserId : async function(user_Id : string) {
        const idFound = await UserRepository.findUserById(user_Id);
        return idFound;
    }

};