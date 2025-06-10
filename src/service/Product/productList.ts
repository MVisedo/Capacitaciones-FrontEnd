import { Product } from "./product";

export interface ProductsList{
    results:Product[],
    page:number,
    limit:number,
    totalPages:number,
    totalResults:number
}

export interface ProductStock{
    product:Product,
    stock:{cantidad:number}
}