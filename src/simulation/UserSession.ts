export interface UserSession {
    userId : string,
    email : string,
    token : string,
    ownedBlogs?: string[],
}