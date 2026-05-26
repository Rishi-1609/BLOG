export interface BlogUpdateRequest {
    blog_Id : string,
    user_Id : string,
    title : string, 
    content : string,
    imageUrl? : string,
    fileName? : string,
}