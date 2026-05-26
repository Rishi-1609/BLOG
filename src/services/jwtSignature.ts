import { env } from "../config/env";
import { UserDatabaseDetails } from "../config/userRequestInterface";
import jwt from "jsonwebtoken";

export function jwtSign(data : UserDatabaseDetails) {
    const token = jwt.sign(
        data, 
        env.JWT_SECRET,
        {expiresIn : "7d"},
    );

    return token;
}