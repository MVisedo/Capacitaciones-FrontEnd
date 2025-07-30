export interface Product{
    id:string,
    name:string,
    descripcion:string,
    imagen:string,
    user:string,
    precio:number
}

export interface CreateProductRequest{
    name:String,
    descripcion:String,
    imagen:String,
    user:String,
    precio:number
}

export interface ProductsList{
    results:Product[],
    page:number,
    limit:number,
    totalPages:number,
    totalResults:number
}

export interface ProductStock{
    product:Product,
    stock:number
}

export interface queryProducts{
    page:number,
    limit:number
} 

export interface UpdateProductRequest{
    name?:String,
    descripcion?:String,
    imagen?:String,
    precio?:number
}
