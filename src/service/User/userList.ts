import { User } from "./user";

export interface UsersList{
    results:User[],
    page:number,
    limit:number,
    totalPages:number,
    totalResults:number
}