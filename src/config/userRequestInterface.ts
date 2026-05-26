export interface UserRequest {
    name : string,
    email : string,
};

export interface UserRegistrationRequest extends UserRequest {
    password : string,
}

export type UserLoginRequest = Omit<UserRegistrationRequest, "name">;

export interface UserDatabaseDetails extends UserRequest {
    user_Id : string,
}