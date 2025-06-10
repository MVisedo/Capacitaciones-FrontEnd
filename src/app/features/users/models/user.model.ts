export interface User{
    id: string
    name: string
    role: string
    email: string
    isEmailVerified: boolean
}
export interface createUserRequest{
    name:string,
    email:string,
    password:string,
    role:string
}
export interface queryUsers{
    page:number,
    limit:number
} 
export interface UpdateUserRequest{
    name:string,
    email:string
}
export interface UsersList{
    results:User[],
    page:number,
    limit:number,
    totalPages:number,
    totalResults:number
}