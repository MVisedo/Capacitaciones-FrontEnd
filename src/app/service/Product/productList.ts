import { Product } from "./product";

export interface ProductsList{
    results:Product[],
    page:number,
    limit:number,
    totalPages:number,
    totalUsers:number
}